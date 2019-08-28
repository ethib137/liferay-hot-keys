# Liferay Hot Keys

Hot keys for Liferay 7.2.

## Usage
Press '?' to see what hotkeys are available.

![availableHotKeys](/images/AvailableHotkeys.png)

Press 'a' + 'k' to create a new hotkey of your own. This is only available when you are logged in to Liferay.

![AddHotKey](/images/AddHotKey.png)

Add custom hotkeys for url based navigation, for clicking on elements, or focusing elements using an elements selector.

## How to Build and Deploy to Liferay

### Build it
` $ ./gradlew build `
The jar file will be in `build/libs/liferay.hot.keys-1.0.0.jar`.

### Deploy to Liferay
` $ ./gradlew deploy -Pauto.deploy.dir="/path/to/liferay/deploy"`

## Issues & Questions Welcome