# Vocab OS — 無料プッシュ通知の設定

この構成は Cloudflare Workers Free + Workers KV Free + Web Push を使います。Firebaseや有料プランは使いません。

## 課金を発生させない前提

- CloudflareアカウントはWorkers Freeのまま使う。
- Workers Paidへ変更しない。クレジットカード・支払方法を登録しない。
- Workers Free / KV Freeの上限に達したら通知が止まる設計とする。
- 有料プランへのアップグレードや支払方法の追加を要求されたら、その場で中止する。
- このリポジトリにAPI_TOKENやVAPID_PRIVATE_KEYを書き込まない。

## 1. キーを生成する

GitHub Pagesで `setup-keys.html` を開き、「キーを生成」を押す。
- `VAPID_PUBLIC_KEY` は公開鍵なので `wrangler.toml` の同名変数に設定する。
- `VAPID_PRIVATE_KEY` と `API_TOKEN` は秘密情報。Cloudflare WorkerのSecretsにのみ設定する。
- 秘密情報をGitHub、チャット、スクリーンショットへ貼らない。

## 2. Cloudflare KVを作る

Cloudflare Dashboard → Workers & Pages → KV からnamespaceを1つ作成する。Free枠のままにする。
発行されたNamespace IDを `wrangler.toml` の `REPLACE_WITH_YOUR_FREE_KV_NAMESPACE_ID` に入れる。

## 3. Workerをデプロイする

Cloudflare DashboardでWorkers & PagesからWorkerを作り、Git連携またはWranglerでこのリポジトリのWorkerをデプロイする。
- Build/deploy command: `npm install && npx wrangler deploy`
- `wrangler.toml` がリポジトリ直下にあることを確認する。
- WorkerのSecretsに次を登録する:
  - `API_TOKEN` = 生成したAPI_TOKEN
  - `VAPID_PRIVATE_KEY` = 生成したVAPID_PRIVATE_KEY
- `wrangler.toml` の `VAPID_PUBLIC_KEY` を生成した公開鍵に置き換える。
- WorkerのKV binding名が `NOTIFICATIONS` であることを確認する。
- Cron Triggerは15分ごとに設定される。

WorkerのURL（例: `https://vocab-os-notifications.<account>.workers.dev`）を控える。

## 4. アプリで通知を有効化

Vocab OSのホーム画面 → 通知設定で:
1. Worker URLを入力する。
2. API_TOKENを入力する。
3. 「通知を有効化」を押して、ブラウザの通知を許可する。
4. テスト通知が届くことを確認する。

通知は復習予定の最も早い日時をサーバーへ同期し、期限到来後のCron実行時に1回送る。サーバーには単語一覧や学習履歴を送らず、端末ID・Push購読情報・次回期限だけを保存する。

## 5. 無料枠の制約

Workers Freeは1日100,000リクエスト、Cron Triggerは1アカウント最大5つ。Workers KV Freeは1日100,000 read、異なるkeyへのwrite 1,000回、保存1GB。上限超過時は該当操作が失敗し、通知が遅延・停止する。上限回避のために有料プランへ移行しない。

## 注意

- Android ChromeではHTTPSと通知許可が必要。ブラウザの省電力設定やOS側の通知制限で遅れる場合がある。
- 通知が来なくても、学習記録は端末内のlocalStorageに残る。
- ブラウザのサイトデータを消すと、端末内の学習記録や通知設定も失われる可能性がある。
- この構成は現段階では単一端末を想定する。
