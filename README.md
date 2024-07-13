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

"shareable-note-stickers" exports a few types and classes, and a bunch of helper functions.

### Types and Constants ###

Type exports are for TypeScript users only - all others may simply skip this section.

* `type SNS_Id = string`
* `type SNS_Identifier = string`
* `type SNS_Name = string`
* `type SNS_Ordinal = string`
* `type SNS_Cardinal = string`
* `type SNS_Text = string`
* `type SNS_Textline = string`
* `type SNS_URL = string`
* `type SNS_Color = string`
<br>&nbsp;<br>
* `type SNS_Location  = number`
* `type SNS_Dimension = number`
* `type SNS_Position = { x:SNS_Location,y:SNS_Location }`
* `type SNS_Size = { Width:SNS_Dimension,Height:SNS_Dimension }`
* `type SNS_Geometry = { x:SNS_Location,y:SNS_Location, Width:SNS_Dimension,Height:SNS_Dimension }`
<br>
* `const SNS_FontStyles = ['normal','italic']`
* `type  SNS_FontStyle  = typeof SNS_FontStyles[number]`

#### Callbacks ####

* `type SNS_onRenderingCallback = (`<br>`  Project:SNS_Project, Board?:SNS_Board, Sticker?:SNS_Sticker`<br>`) => void`
<br>
* `type SNS_onErrorCallback = (`<br>`  Project:SNS_Project, Visual:SNS_Visual, Error:SNS_Error`<br>`) => void`

#### Search Support ####

* `const SNS_MatchModes = ['equality','containment','match']`
* `type  SNS_MatchMode = typeof SNS_MatchModes[number]`
<br>
* `const SNS_matchableProperties = ['Name','Value','Script']`
* `type  SNS_matchableProperty = typeof SNS_matchableProperties[number]`
* `type  SNS_matchablePropertySet = { [Key:string]:boolean }`
<br>
* `type SNS_ErrorRelevance = null|boolean`
<br>
* `type SNS_VisualMatch = {`<br>`  Visual:SNS_Visual, Property?:SNS_matchableProperty,`<br>`  StartIndex?:SNS_Ordinal, EndIndex?:SNS_Ordinal`<br>`}`

#### Dialogs ####

* `type SNS_Dialog = {`<br>`  Id:SNS_Id, Name:SNS_Name, Title:SNS_Textline, isResizable:boolean,`<br>`  x:SNS_Location, y:SNS_Location, Width:SNS_Dimension, Height:SNS_Dimension,`<br>`  minWidth:number, maxWidth?:number, minHeight:number, maxHeight?:number,`<br>`  Visibility:boolean, Renderer:Function, onClose?:Function`<br>`}`

#### Change Reporting ####

* `const SNS_Changes = [`<br>`  'createBoard',   'configureFolder',  'attachBoard',   'detachBoard',   'destroyBoard',`<br>`  'createSticker', 'configureSticker', 'attachSticker', 'detachSticker', 'destroySticker',`<br>`]`
* `type SNS_Change = typeof SNS_Changes[number]`
<br>
* `type SNS_onChangeCallback = (`<br>`  Project:SNS_Project, Change:SNS_Change, Id:SNS_Id, ...ArgList:any[]`<br>`) => void`

#### Error Reporting ####

* `const SNS_ErrorTypes = [`<br>`  'missing Behaviour',         'Behaviour Execution Failure',`<br>`  'Script Compilation Failure','Script Execution Failure',`<br>`  'Rendering Failure',         'Event Handling Failure',`<br>`  '"onMount" Callback Failure','"onUnmount" Callback Failure'`<br>`]`
* `type SNS_ErrorType = typeof SNS_ErrorTypes[number]`
<br>
* `type SNS_Error = {`<br>`  Type:SNS_ErrorType,`<br>`  Message:SNS_Text,`<br>`  Cause:any`<br>`}`

#### UI Support ####

* `type SNS_groupedBehaviorEntryList = SNS_BehaviorEntryGroup[]`
* `type SNS_BehaviorEntryGroup = {`<br>
  `  GroupLabel:SNS_Textline,`<br>
  `  BehaviorEntryList:SNS_BehaviorEntry[]`<br>
  `}`
* `type SNS_BehaviorEntry = {`<br>
  `  Label:SNS_Textline, Name:SNS_Identifier, disabled:boolean`<br>
  `}`

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
