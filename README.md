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

"shareable-note-stickers" is intended for being used as a module within a "host application". In order to use it, simply import the necessary types, constants and classes:

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


(work in progress, see [NoteStickers](https://github.com/rozek/note-stickers) for a first usage example)

## License ##

[MIT License](LICENSE.md)
