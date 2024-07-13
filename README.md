# shareable-note-stickers #

basic data model for a shareable application with scriptable "sticky notes"

![NoteStickers Screenshot](https://github.com/rozek/note-stickers/blob/main/screenshots/NoteStickers-Screenshot.png)

## Overview ##

This module implements the underlying data model for a shareable hierarchical collection of "boards" containing scriptable widgets (called "stickers").

It will often be used in combination with

* [sns-boardview](https://github.com/rozek/sns-boardview) - a [preact](https://preactjs.com/) component that displays one of these boards of stickers and provides all methods to visually select and edit them, and
* a "sharing adapter" such as the [sns-collabs-adapter](https://github.com/rozek/sns-collabs-adapter) that actually provides the sharing capability.

To get a real application, you'll have to combine these modules and add a proper user interface - similar to [NoteStickers](https://github.com/rozek/note-stickers).

Because of this modularity, it is not too difficult to use a different sharing framework (such as [Y.js](https://github.com/yjs/yjs) or [automerge](https://github.com/automerge/automerge)), modify the user interface according to your personal needs or even develop a headless tool that analyzes and/or changes the shared data without user intervention.

## Usage ##

"shareable-note-stickers" is intended for being used as a module within a "host application". In order to use it, simply import the necessary types, constants, functions and classes:

```
  import {
    throwError, throwReadOnlyError,
    ValueIsBoard, ValueIsSticker,
    ValueIsName, ValueIsIdentifier, ValueIsGeometry, ValueIsError,
    allowBoard,
    SNS_Id, SNS_Name, SNS_Identifier,
    SNS_Ordinal, SNS_Text, SNS_Textline, SNS_Color, SNS_URL,
    SNS_Geometry, SNS_FontStyle, SNS_Error,
    SNS_Visual, SNS_Folder, SNS_Project, SNS_Board, SNS_Sticker,
    newId, removeIdsFrom, SNS_Change,
    TemplateOfBehavior,
    SNS_BehaviorEntryGroup, SNS_BehaviorEntry,
    groupedBehaviorEntryList,
  } from 'https://rozek.github.io/shareable-note-stickers/dist/shareable-note-stickers.modern.js'
```

(Note: the above `import` statement is just an example - your imports may differ)

To simplify scripting, most of the exported values are also available as part of the global variable `SNS`

```
  window.SNS = {
    SNS_FontStyles, SNS_ErrorTypes,
    SNS_matchableProperties, SNS_MatchModes,
    throwError, throwReadOnlyError,
    ValueIsVisual, allowVisual, allowedVisual, expectVisual, expectedVisual,
    ValueIsFolder, allowFolder, allowedFolder, expectFolder, expectedFolder,
    ValueIsProject, allowProject, allowedProject, expectProject, expectedProject,
    ValueIsBoard, allowBoard, allowedBoard, expectBoard, expectedBoard,
    ValueIsSticker, allowSticker, allowedSticker, expectSticker, expectedSticker,
    ValueIsId, allowId, allowedId, expectId, expectedId,
    ValueIsIdentifier, allowIdentifier, allowedIdentifier, expectIdentifier, expectedIdentifier,
    ValueIsName, allowName, allowedName, expectName, expectedName,
    ValueIsLocation, allowLocation, allowedLocation, expectLocation, expectedLocation,
    ValueIsDimension, allowDimension, allowedDimension, expectDimension, expectedDimension,
    ValueIsPosition, allowPosition, allowedPosition, expectPosition, expectedPosition,
    ValueIsSize, allowSize, allowedSize, expectSize, expectedSize,
    ValueIsGeometry, allowGeometry, allowedGeometry, expectGeometry, expectedGeometry,
    ValueIsError, allowError, allowedError, expectError, expectedError,
    ValueIsSerializable, allowSerializable, allowedSerializable, expectSerializable, expectedSerializable,
    acceptableBoolean, acceptableOptionalBoolean,
    acceptableNumber, acceptableOptionalNumber,
    acceptableNumberInRange, acceptableOptionalNumberInRange,
    acceptableInteger, acceptableOptionalInteger,
    acceptableIntegerInRange, acceptableOptionalIntegerInRange,
    acceptableOrdinal, acceptableOptionalOrdinal,
    acceptableString, acceptableOptionalString,
    acceptableNonEmptyString, acceptableOptionalNonEmptyString,
    acceptableStringMatching, acceptableOptionalStringMatching,
    acceptableText, acceptableOptionalText,
    acceptableTextline, acceptableOptionalTextline,
    acceptableFunction, acceptableOptionalFunction,
    acceptableList, acceptableOptionalList,
    acceptableListSatisfying, acceptableOptionalListSatisfying,
    acceptableColor, acceptableOptionalColor,
    acceptableEMailAddress, acceptablePhoneNumber, acceptableURL,
    newId, removeIdsFrom,
    CSSStyleOfVisual,
    TemplateOfBehavior,
  }
```

## Exports ##

(t.b.w.)

### SNS_Visual ###

(t.b.w.)

### SNS_Folder ###

(t.b.w.)

### SNS_Project ###

(t.b.w.)

### SNS_Board ###

(t.b.w.)

### SNS_Sticker ###

(t.b.w.)

### Classification and Validation Functions ###

(t.b.w.)

### Acceptables ###

(t.b.w.)

### Adapter Support ###

(t.b.w.)

### UI Support ###

(t.b.w.)

## File Format ##

(work in progress, see [NoteStickers](https://github.com/rozek/note-stickers) for a first usage example)

## License ##

[MIT License](LICENSE.md)
