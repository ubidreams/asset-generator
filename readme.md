asset-generator
===============

This is a cheap asset resizer for Android and iOS. It takes an image in @3x or xxhdpi size and resize it:
* Android: mdpi, ldpi, hdpi, xhdpi, xxhdpi, xxxhdpi
* iOS: @1x, @2x, @3x

## Installation

```
npm install https://github.com/ubidreams/asset-generator -g
```

## Usage

```
asset-generator <files> --android <target-dir-android> --ios <target-dir-ios>
```

android or ios option is optional. Only use --android if you need only android assets.

example:
```
#asset-generator *.png --android /my-android-project/app/src/main/res --ios /my-ios-project/app/assets
```

---
Copyright (c) Tobias Zeising, tobias.zeising@aditu.de  
http://www.aditu.de  
Licensed under the MIT license 
