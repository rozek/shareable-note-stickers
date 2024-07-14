# shareable-note-stickers #

basic data model for a shareable application with scriptable "sticky notes"

![NoteStickers Screenshot](https://github.com/rozek/note-stickers/blob/main/screenshots/NoteStickers-Screenshot.png)

## Overview ##

This module implements the underlying data model for a shareable hierarchical collection of "boards" containing scriptable widgets (called "stickers").

It will often be used in combination with

* [sns-boardview](https://github.com/rozek/sns-boardview) - a [preact](https://preactjs.com/) component that displays one of these boards of stickers and provides all methods to visually select and edit them, and
* a "sharing adapter" such as the [sns-collabs-adapter](https://github.com/rozek/sns-collabs-adapter) that actually provides the sharing capability.

To get a real application, you'll have to combine these modules and add a proper user interface - as done by [NoteStickers](https://github.com/rozek/note-stickers).

Because of this modularity, it is not too difficult to use a different sharing framework (such as [Y.js](https://github.com/yjs/yjs) or [automerge](https://github.com/automerge/automerge)), modify the user interface according to your personal needs or even develop a headless tool that analyzes and/or changes the shared data without user intervention.

(work in progress, see [NoteStickers](https://github.com/rozek/note-stickers) for a first usage example)

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

To simplify scripting, most of the exported functions are also available as part of the global variable `SNS`

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
<br>&nbsp;<br>
* `const SNS_FontStyles = ['normal','italic']`
* `type  SNS_FontStyle  = typeof SNS_FontStyles[number]`

#### Rendering ####

* `type SNS_onRenderingCallback = (`<br>`  Project:SNS_Project, Board?:SNS_Board, Sticker?:SNS_Sticker`<br>`) => void`

#### Search Support ####

* `const SNS_MatchModes = ['equality','containment','match']`
* `type  SNS_MatchMode = typeof SNS_MatchModes[number]`
<br>&nbsp;<br>
* `const SNS_matchableProperties = ['Name','Value','Script']`
* `type  SNS_matchableProperty = typeof SNS_matchableProperties[number]`
* `type  SNS_matchablePropertySet = { [Key:string]:boolean }`
<br>&nbsp;<br>
* `type SNS_ErrorRelevance = null|boolean`
<br>&nbsp;<br>
* `type SNS_VisualMatch = {`<br>`  Visual:SNS_Visual, Property?:SNS_matchableProperty,`<br>`  StartIndex?:SNS_Ordinal, EndIndex?:SNS_Ordinal`<br>`}`

#### Dialogs ####

* `type SNS_Dialog = {`<br>`  Id:SNS_Id, Name:SNS_Name, Title:SNS_Textline, isResizable:boolean,`<br>`  x:SNS_Location, y:SNS_Location, Width:SNS_Dimension, Height:SNS_Dimension,`<br>`  minWidth:number, maxWidth?:number, minHeight:number, maxHeight?:number,`<br>`  Visibility:boolean, Renderer:Function, onClose?:Function`<br>`}`

#### Change Reporting ####

* `const SNS_Changes = [`<br>`  'createBoard',   'configureFolder',  'attachBoard',   'detachBoard',   'destroyBoard',`<br>`  'createSticker', 'configureSticker', 'attachSticker', 'detachSticker', 'destroySticker',`<br>`]`
* `type SNS_Change = typeof SNS_Changes[number]`
<br>&nbsp;<br>
* `type SNS_onChangeCallback = (`<br>`  Project:SNS_Project, Change:SNS_Change, Id:SNS_Id, ...ArgList:any[]`<br>`) => void`

#### Error Reporting ####

* `const SNS_ErrorTypes = [`<br>`  'missing Behaviour',         'Behaviour Execution Failure',`<br>`  'Script Compilation Failure','Script Execution Failure',`<br>`  'Rendering Failure',         'Event Handling Failure',`<br>`  '"onMount" Callback Failure','"onUnmount" Callback Failure'`<br>`]`
* `type SNS_ErrorType = typeof SNS_ErrorTypes[number]`
<br>&nbsp;<br>
* `type SNS_Error = {`<br>`  Type:SNS_ErrorType,`<br>`  Message:SNS_Text,`<br>`  Cause:any`<br>`}`
<br>&nbsp;<br>
* `type SNS_onErrorCallback = (`<br>`  Project:SNS_Project, Visual:SNS_Visual, Error:SNS_Error`<br>`) => void`

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

* `Id`
* `Name`
<br>&nbsp;<br>
* `Project`
* `Folder`
* `isAttached`
* `Application`
<br>&nbsp;<br>
* `BackgroundColor`
* `BackgroundTexture`
* `FontFamily`
* `FontSize`
* `FontWeight`
* `FontStyle`
* `LineHeight`
* `ForegroundColor`
* `Color`
<br>&nbsp;<br>
* `Value`
* `editableValue`
<br>&nbsp;<br>
* `observed`
* `unobserved`
* `memoized`
<br>&nbsp;<br>
* `Script`
* `activeScript`
* `pendingScript`
* `activateScript`
* `ScriptError`
<br>&nbsp;<br>
* `CSSStyle`
* `Renderer`
* `onRender`
* `Rendering`
* `rerender`
<br>&nbsp;<br>
* `View`
* `isMounted`
* `onMount`
* `onUnmount`
<br>&nbsp;<br>
* `Error`
* `hasError`
<br>&nbsp;<br>
* `ownMatchesFor`
* `allMatchesFor`

(t.b.w.)

### SNS_Folder (extends SNS_Visual) ###

* `Path`
* `BoardAtPath`
* `IndexPath`
<br>&nbsp;<br>
* `SnapToGrid`
* `GridWidth`
* `GridHeight`
<br>&nbsp;<br>
* `Index`
* `maybeShiftedUp`
* `mayBeShiftedDown`
* `mayBeShiftedIn`
* `mayBeShiftedOut`
<br>&nbsp;<br>
* `containsFolder`
<br>&nbsp;<br>
* `BoardList`
* `BoardCount`
* `Board`
* `existingBoard`
* `BoardNamed`
* `BoardAt`
* `hasBoard`
<br>&nbsp;<br>
* `newBoardAt`
* `BoardDeserializedAt`
* `DuplicateOfBoardAt`
<br>&nbsp;<br>
* `mayShiftBoardUp`
* `mayShiftBoardDown`
* `shiftBoardToTop`
* `shiftBoardUp`
* `shiftBoardDown`
* `shiftBoardToBottom`
* `shiftBoardTo`
* `shiftBoardsByIndex`
<br>&nbsp;<br>
* `mayShiftBoardIn`
* `mayShiftBoardOut`
* `shiftBoardIn`
* `shiftBoardOut`
<br>&nbsp;<br>
* `mayMoveBoardTo`
* `moveBoardTo`
<br>&nbsp;<br>
* `destroyBoard`
* `clear`

(t.b.w.)

### SNS_Project (extends SNS_Folder) ###

* `BoardAtIndexPath`
<br>&nbsp;<br>
* `FolderWithId`
* `BoardWithId`
* `StickerWithId`
<br>&nbsp;<br>
* `recursivelyActivateAllScripts`
<br>&nbsp;<br>
* `onChange`
<br>&nbsp;<br>
* `onRendering`
* `rerender`
<br>&nbsp;<br>
* `onError`
<br>&nbsp;<br>
* `Application`
<br>&nbsp;<br>
* `Serialization`
* `deserializedFrom`

(t.b.w.)

### SNS_Board (extends SNS_Folder) ###

* `StickerList`
* `StickerCount`
* `IndexOfSticker`
* `Sticker`
* `existingSticker`
* `StickerNamed`
* `StickerAt`
* `hasSticker`
<br>&nbsp;<br>
* `newStickerAt`
* `StickerDeserializedAt`
* `DuplicateofStickerAt`
<br>&nbsp;<br>
* `mayShiftStickerUp`
* `mayShiftStickerDown`
* `shiftStickerToTop`
* `shiftStickerUp`
* `shiftStickerDown`
* `shiftStickerToBottom`
* `shiftStickerTo`
* `shiftStickersByIndex`
<br>&nbsp;<br>
* `destroySticker`
* `clear`
<br>&nbsp;<br>
* `onClick`
* `onDrop`
<br>&nbsp;<br>
* `DialogList`
* `IndexOfDialog`
* `openDialog`
* `DialogIsOpen`
* `openTextViewDialog`
* `openHTMLViewDialog`
* `openImageViewDialog`
* `openSVGViewDialog`
* `openWebViewDialog`
* `positionDialogAt`
* `sizeDialogTo`
* `DialogIsFrontmost`
* `bringDialogToFront`
* `closeDialog`
* `closeAllDialogs`
<br>&nbsp;<br>
* `Serialization`

(t.b.w.)

### SNS_Sticker (extends SNS_Visual) ###

* `Board`
<br>&nbsp;<br>
* `Index`
* `mayBeShiftedUp`
* `mayBeShiftedDown`
<br>&nbsp;<br>
* `minWidth`
* `maxWidth`
* `minHeight`
* `maxHeight`
* `x`
* `y`
* `Width`
* `Height`
* `Position`
* `Size`
* `Geometry`
<br>&nbsp;<br>
* `Lock`
* `isLocked`
* `lock`
* `unlock`
<br>&nbsp;<br>
* `Selectability`
* `isSelectable`
<br>&nbsp;<br>
* `Visibility`
* `show`
* `hide`
* `isVisible`
<br>&nbsp;<br>
* `Enabling`
* `enable`
* `disable`
* `isEnabled`
<br>&nbsp;<br>
* `onClick`
* `onDrop`
<br>&nbsp;<br>
* `Rendering`
* `rerender`
<br>&nbsp;<br>
* `Serialization`

(t.b.w.)

### SNS_Adapter ###

* `ConnectionState`
* `isConnected`
<br>&nbsp;<br>
* `connect`
* `disconnect`

(t.b.w.)

### Classification and Validation Functions ###

* `ValueIsVisual`, `allow/expect[ed]Visual`
* `ValueIsFolder`, `allow/expect[ed]Folder`
<br>&nbsp;<br>
* `ValueIsProjec`, `allow/expect[ed]Project`
* `ValueIsBoard`, `allow/expect[ed]Board`
* `ValueIsSticker`, `allow/expect[ed]Sticker`
<br>&nbsp;<br>
* `ValueIsId`, `allow/expect[ed]Id`
* `ValueIsIdentifie`, `allow/expect[ed]Identifier`
* `ValueIsName`, `allow/expect[ed]Name`
<br>&nbsp;<br>
* `ValueIsLocation`, `allow/expect[ed]Location`
* `ValueIsDimension`, `allow/expect[ed]Dimension`
* `ValueIsPosition`, `allow/expect[ed]Position`
* `ValueIsSize`, `allow/expect[ed]Size`
* `ValueIsGeometry`, `allow/expect[ed]Geometry`
<br>&nbsp;<br>
* `ValueIsError`, `allow/expect[ed]Error`
<br>&nbsp;<br>
* `ValueIsSerializable`, `allow/expect[ed]Serializable`

(t.b.w.)

### Acceptables ###

* `acceptable[Optional]Boolean`
* `acceptable[Optional]Number`
* `acceptable[Optional]NumberInRange`
* `acceptable[Optional]Integer`
* `acceptable[Optional]IntegerInRange`
* `acceptable[Optional]Ordinal`
* `acceptable[Optional]String`
* `acceptable[Optional]NonEmptyString`
* `acceptable[Optional]StringMatching`
* `acceptable[Optional]Text`
* `acceptable[Optional]Textline`
* `acceptable[Optional]Function`
* `acceptable[Optional]List`
* `acceptable[Optional]ListSatisfying`
* `acceptable[Optional]Color`
* `acceptable[Optional]EMailAddress`
* `acceptable[Optional]PhoneNumber`
* `acceptable[Optional]URL`

(t.b.w.)

### Adapter Support ###

* `attachBoard`
* `attachSticker`
* `detachBoard`
* `detachSticker`
<br>&nbsp;<br>
* `createBoard`
* `createSticker`
* `destroyBoard`
* `destroySticker`
<br>&nbsp;<br>
* `configureFolder`
* `configureSticker`
<br>&nbsp;<br>
* `sanitizeBoardList`
* `sanitizeStickerList`

(t.b.w.)

### UI Support ###

* `groupedBehaviorEntryList`

(t.b.w.)

### Others ###

* `throwError`
* `throwReadOnlyError`
<br>&nbsp;<br>
* `removeIdsFrom`
<br>&nbsp;<br>
* `TemplateOfBehavior`
<br>&nbsp;<br>
* `CSSStyleOfVisual`

(t.b.w.)

## File Format ##

The following JSON schema describes the file format used for exported NoteSticker projects:

(t.b.w.)

## License ##

[MIT License](LICENSE.md)
