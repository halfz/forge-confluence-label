# Confluence Labeling Forge App

## Requirements

- Make config.ts in root directory.

sample code
```typescript
const config = {
    labelMaps: {
        '123402': ['notes'],
        '11149': ['idea'],
        '9991314': ['account'],
        '51235': ['setting', 'notice'],
        '82923': ['etc']
    },
}

export default config;
```

Labeling needs ancestor content id and its labels.  

Confluence url looks like this.

> https://{workspace}.atlassian.net/wiki/spaces/{space}/pages/{pageId}

Ancestor content id is pageId, which created by Confluence automatically.  

Map values are label names, you want to add in descendant content.

## Quick start

### Local

- Build and deploy your app by running:
```shell
forge deploy
```

- Install your app in an Atlassian site by running:
```shell
forge install
```

- Check Logs by running:
```shell
forge logs
```

- Develop your app by running `forge tunnel` to proxy invocations locally:
```shell
forge tunnel
```

### Production

-e or --environment options can choose deployment, staging, production.

Production environment doesn't need to deploy on marketplace but can do.

[Developer console](https://developer.atlassian.com/console/myapps/)

You should edit distribution controls to deploy your app to production.

After that you can use installation link to install your app.

Only administrator of the Atlassian site can install your app by link.

You can't use **logs command** in production environment, so check logs in developer console.

- Build and deploy your app by running in production:
```shell
forge deploy -e production
```

- Install your app in production
```shell
forge install -e production
```

## Create New App

[Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

```yaml
app:
    id: {appId}
```

Copy and paste **manifest.yml** and change app id to your app id.

### Update your app
**forge install** only needs to install in new site.

```shell
forge deploy
```
You can update your modification by deploy command.



