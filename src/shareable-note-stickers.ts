/*******************************************************************************
*                                                                              *
*                        Shareable Note Stickers (SNS)                         *
*                                                                              *
*******************************************************************************/

  declare const QRCode:Function|Indexable

  import {
//  throwError,
    quoted,
    ValuesDiffer,
    ValueIsBoolean,
    ValueIsNumber, ValueIsNumberInRange, ValueIsFiniteNumber,
      ValueIsInteger, ValueIsIntegerInRange, ValueIsOrdinal,
    ValueIsString, ValueIsStringMatching, ValueIsText, ValueIsTextline,
    ValueIsFunction,
    ValueIsObject, ValueIsPlainObject,
    ValueIsList, ValueIsListSatisfying,
    ValueIsOneOf,
    ValueIsColor, ValueIsURL,
    ValidatorForClassifier, acceptNil, rejectNil,
    expectValue,
    allowBoolean, expectBoolean,
    allowInteger, expectInteger, allowIntegerInRange, expectIntegerInRange,
      allowOrdinal, expectOrdinal, allowCardinal,
    allowText, allowTextline, expectTextline,
    allowPlainObject,
    expectListSatisfying,
    allowFunction, expectFunction,
    allowOneOf,
    allowColor, ValueIsEMailAddress, allowURL,
  } from 'javascript-interface-library'

  const ValueIsPhoneNumber = ValueIsTextline // *C* should be implemented

  import { html } from 'htm/preact'

  import { customAlphabet }   from 'nanoid'
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
  import { nolookalikesSafe } from 'nanoid-dictionary'

  import hyperactiv from 'hyperactiv'
  const { observe, computed, dispose } = hyperactiv

/**** make some existing types indexable ****/

  interface Indexable { [Key:string]:any }

/**** define serializable types ****/

  type serializableValue  = null | boolean | number | string |
                            serializableObject | serializableArray
  type serializableObject = { [Key:string]:serializableValue }
  type serializableArray  = serializableValue[]
  type Serializable       = serializableObject

/**** prepare an SNS-specific Stylesheet ****/

  const BehaviorStyleElement = document.createElement('style')
    BehaviorStyleElement.innerHTML = `
/**** DefaultSticker ****/

  .SNS.DefaultSticker {
    left:0px; top:0px; right:0px; bottom:0px;
  }
`
  document.head.appendChild(BehaviorStyleElement)

//------------------------------------------------------------------------------
//--                             Type Definitions                             --
//------------------------------------------------------------------------------

  export type SNS_Id         = string         // mainly for illustrative reasons
  export type SNS_Identifier = string                                    // dto.
  export type SNS_Name       = string                                    // dto.
  export type SNS_Ordinal    = number                                    // dto.
  export type SNS_Cardinal   = number                                    // dto.
  export type SNS_Text       = string                                    // dto.
  export type SNS_Textline   = string                                    // dto.
  export type SNS_URL        = string                                    // dto.
  export type SNS_Color      = string                                    // dto.

/**** geometry-related types ****/

  export type SNS_Location  = number         // mainly for illustrative purposes
  export type SNS_Dimension = number                                     // dto.
  export type SNS_Position  = { x:SNS_Location,y:SNS_Location }
  export type SNS_Size      = { Width:SNS_Dimension,Height:SNS_Dimension }
  export type SNS_Geometry  = { x:SNS_Location,y:SNS_Location, Width:SNS_Dimension,Height:SNS_Dimension }

/**** configuration-related types ****/

  export const SNS_FontStyles = ['normal','italic']
  export type  SNS_FontStyle  = typeof SNS_FontStyles[number]

/**** Rendering Callback ****/

  export type SNS_onRenderingCallback = (
    Project:SNS_Project, Board?:SNS_Board, Sticker?:SNS_Sticker
  ) => void

/**** Error Report ****/

  export const SNS_ErrorTypes = [
    'missing Behaviour',         'Behaviour Execution Failure',
    'Script Compilation Failure','Script Execution Failure',
    'Rendering Failure',         'Event Handling Failure',
    '"onMount" Callback Failure','"onUnmount" Callback Failure'
  ]
  export type SNS_ErrorType = typeof SNS_ErrorTypes[number]

  export type SNS_Error = {
    Type:SNS_ErrorType,          // also serves as a title for the error display
    Message:SNS_Text,
    Cause:any
  }

/**** Error Callback ****/

  export type SNS_onErrorCallback = (
    Project:SNS_Project, Visual:SNS_Visual, Error:SNS_Error
  ) => void

/**** throwError - simplifies construction of named errors ****/

  export function throwError (Message:string):never {
    let Match = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(Message)
    if (Match == null) {
      throw new Error(Message)
    } else {
      let namedError = new Error(Match[2])
        namedError.name = Match[1]
      throw namedError
    }
  }

/**** throwReadOnlyError ****/

// @ts-ignore TS2534 why is TS complaining here?
  export function throwReadOnlyError (Name:string):never {
    throwError(
      'ReadOnlyProperty: property ' + quoted(Name) + ' must not be set'
    )
  }

//------------------------------------------------------------------------------
//--                 Classification and Validation Functions                  --
//------------------------------------------------------------------------------

/**** ValueIsVisual ****/

  export function ValueIsVisual (Value:any):boolean {
    return(Value instanceof SNS_Visual)
  }

/**** allow/expect[ed]Visual ****/

  export const allowVisual = ValidatorForClassifier(
    ValueIsVisual, acceptNil, 'SNS visual'
  ), allowedVisual = allowVisual

  export const expectVisual = ValidatorForClassifier(
    ValueIsVisual, rejectNil, 'SNS visual'
  ), expectedVisual = expectVisual

/**** ValueIsFolder ****/

  export function ValueIsFolder (Value:any):boolean {
    return (Value instanceof SNS_Folder)
  }

/**** allow/expect[ed]Folder ****/

  export const allowFolder = ValidatorForClassifier(
    ValueIsFolder, acceptNil, 'SNS folder'
  ), allowedFolder = allowFolder

  export const expectFolder = ValidatorForClassifier(
    ValueIsFolder, rejectNil, 'SNS folder'
  ), expectedFolder = expectFolder

/**** ValueIsProject ****/

  export function ValueIsProject (Value:any):boolean {
    return (Value instanceof SNS_Project)
  }

/**** allow/expect[ed]Project ****/

  export const allowProject = ValidatorForClassifier(
    ValueIsProject, acceptNil, 'SNS project'
  ), allowedProject = allowProject

  export const expectProject = ValidatorForClassifier(
    ValueIsProject, rejectNil, 'SNS project'
  ), expectedProject = expectProject

/**** ValueIsBoard ****/

  export function ValueIsBoard (Value:any):boolean {
    return (Value instanceof SNS_Board)
  }

/**** allow/expect[ed]Board ****/

  export const allowBoard = ValidatorForClassifier(
    ValueIsBoard, acceptNil, 'SNS board'
  ), allowedBoard = allowBoard

  export const expectBoard = ValidatorForClassifier(
    ValueIsBoard, rejectNil, 'SNS board'
  ), expectedBoard = expectBoard

/**** ValueIsSticker ****/

  export function ValueIsSticker (Value:any):boolean {
    return (Value instanceof SNS_Sticker)
  }

/**** allow/expect[ed]Sticker ****/

  export const allowSticker = ValidatorForClassifier(
    ValueIsSticker, acceptNil, 'SNS sticker'
  ), allowedSticker = allowSticker

  export const expectSticker = ValidatorForClassifier(
    ValueIsSticker, rejectNil, 'SNS sticker'
  ), expectedSticker = expectSticker

/**** ValueIsId ****/

  export function ValueIsId (Value:any):boolean {
    return ValueIsTextline(Value) // *C* could definitely be better
  }

/**** allow/expect[ed]Id ****/

  export const allowId = ValidatorForClassifier(
    ValueIsId, acceptNil, 'unique SNS id'
  ), allowedId = allowId

  export const expectId = ValidatorForClassifier(
    ValueIsId, rejectNil, 'unique SNS id'
  ), expectedId = expectId

/**** ValueIsIdentifier ****/

  const SNS_IdentifierPattern = /^[a-z$_][a-z$_0-9]*$/i

  export function ValueIsIdentifier (Value:any):boolean {
    return ValueIsStringMatching(Value, SNS_IdentifierPattern)
  }

/**** allow/expect[ed]Identifier ****/

  export const allowIdentifier = ValidatorForClassifier(
    ValueIsIdentifier, acceptNil, 'note stickers identifier'
  ), allowedIdentifier = allowIdentifier

  export const expectIdentifier = ValidatorForClassifier(
    ValueIsIdentifier, rejectNil, 'note stickers identifier'
  ), expectedIdentifier = expectIdentifier

/**** ValueIsName ****/

  export function ValueIsName (Value:any):boolean {
    return ValueIsTextline(Value)
  }

/**** allow/expect[ed]Name ****/

  export const allowName = ValidatorForClassifier(
    ValueIsName, acceptNil, 'SNS name'
  ), allowedName = allowName

  export const expectName = ValidatorForClassifier(
    ValueIsName, rejectNil, 'SNS name'
  ), expectedName = expectName

/**** ValueIsLocation ****/

  export function ValueIsLocation (Value:any):boolean {
    return ValueIsFiniteNumber(Value)
  }

/**** allow/expect[ed]Location ****/

  export const allowLocation = ValidatorForClassifier(
    ValueIsLocation, acceptNil, 'sticker coordinate'
  ), allowedLocation = allowLocation

  export const expectLocation = ValidatorForClassifier(
    ValueIsLocation, rejectNil, 'sticker coordinate'
  ), expectedLocation = expectLocation

/**** ValueIsDimension ****/

  export function ValueIsDimension (Value:any):boolean {
    return ValueIsFiniteNumber(Value) && (Value >= 0)
  }

/**** allow/expect[ed]Dimension ****/

  export const allowDimension = ValidatorForClassifier(
    ValueIsDimension, acceptNil, 'sticker dimension'
  ), allowedDimension = allowDimension

  export const expectDimension = ValidatorForClassifier(
    ValueIsDimension, rejectNil, 'sticker dimension'
  ), expectedDimension = expectDimension

/**** ValueIsPosition ****/

  export function ValueIsPosition (Value:any):boolean {
    return (
      ValueIsObject(Value) &&
      ValueIsLocation(Value.x) &&
      ValueIsLocation(Value.y)
    )
  }

/**** allow/expect[ed]Position ****/

  export const allowPosition = ValidatorForClassifier(
    ValueIsPosition, acceptNil, 'sticker position'
  ), allowedPosition = allowPosition

  export const expectPosition = ValidatorForClassifier(
    ValueIsPosition, rejectNil, 'sticker position'
  ), expectedPosition = expectPosition

/**** ValueIsSize ****/

  export function ValueIsSize (Value:any):boolean {
    return (
      ValueIsObject(Value) &&
      ValueIsDimension(Value.Width) &&
      ValueIsDimension(Value.Height)
    )
  }

/**** allow/expect[ed]Size ****/

  export const allowSize = ValidatorForClassifier(
    ValueIsSize, acceptNil, 'sticker size'
  ), allowedSize = allowSize

  export const expectSize = ValidatorForClassifier(
    ValueIsSize, rejectNil, 'sticker size'
  ), expectedSize = expectSize

/**** ValueIsGeometry ****/

  export function ValueIsGeometry (Value:any):boolean {
    return (
      ValueIsObject(Value) &&
      ValueIsLocation(Value.x) && ValueIsDimension(Value.Width) &&
      ValueIsLocation(Value.y) && ValueIsDimension(Value.Height)
    )
  }

/**** allow/expect[ed]Geometry ****/

  export const allowGeometry = ValidatorForClassifier(
    ValueIsGeometry, acceptNil, 'sticker geometry'
  ), allowedGeometry = allowGeometry

  export const expectGeometry = ValidatorForClassifier(
    ValueIsGeometry, rejectNil, 'sticker geometry'
  ), expectedGeometry = expectGeometry

/**** ValueIsError ****/

  export function ValueIsError (Value:any):boolean {
    return (
      ValueIsPlainObject(Value) &&
      ValueIsOneOf(Value.Type,SNS_ErrorTypes) &&
      ValueIsText(Value.Message)
    )
  }

/**** allow/expect[ed]Error ****/

  export const allowError = ValidatorForClassifier(
    ValueIsError, acceptNil, 'error descriptor'
  ), allowedError = allowError

  export const expectError = ValidatorForClassifier(
    ValueIsError, rejectNil, 'error descriptor'
  ), expectedError = expectError

/**** ValueIsSerializable ****/

  export function ValueIsSerializable (Value:any):boolean {
    return ValueIsPlainObject(Value) // *C* could definitely be better!
  }

/**** allow/expect[ed]Serializable ****/

  export const allowSerializable = ValidatorForClassifier(
    ValueIsSerializable, acceptNil, 'serializable object'
  ), allowedSerializable = allowSerializable

  export const expectSerializable = ValidatorForClassifier(
    ValueIsSerializable, rejectNil, 'serializable object'
  ), expectedSerializable = expectSerializable

//------------------------------------------------------------------------------
//--                      Primitives and Change Reports                       --
//------------------------------------------------------------------------------

  export const SNS_Changes = [
    'createBoard',   'configureFolder',  'attachBoard',   'detachBoard',   'destroyBoard',
    'createSticker', 'configureSticker', 'attachSticker', 'detachSticker', 'destroySticker',
  ]
  export type SNS_Change = typeof SNS_Changes[number]

  export type SNS_onChangeCallback = (
    Project:SNS_Project, Change:SNS_Change, Id:SNS_Id, ...ArgList:any[]
  ) => void

/**** createBoard ****/

  export function createBoard (
    Project:SNS_Project, BoardId:SNS_Id
  ):void {
    expectProject('SNS project',Project)
    expectId        ('board id',BoardId)

    if (BoardId === Project.Id) {
      console.error('the given "BoardId" is the id of the current project')
      return
    }

    let Board = Project.BoardWithId(BoardId)
    if (Board != null) {
      console.error('a board with the given "BoardId" exists already')
      return
    }

    Board = new SNS_Board(Project,BoardId)   // will automatically be registered
  }

/**** configureFolder ****/

  export function configureFolder (
    Project:SNS_Project, FolderId:SNS_Id, Property:SNS_Identifier, Value:any
  ):void {
    expectProject           ('SNS project',Project)
    expectId                  ('folder id',FolderId)
    expectIdentifier('property identifier',Property)

    let Folder = Project.FolderWithId(FolderId)
    if (Folder == null) {                                 // should never happen
      console.error('no folder with the given "FolderId" found')
      return
    }

    const PropertySet:Indexable = (
      ValueIsProject(Folder) ? SNS_ProjectPropertySet : SNS_BoardPropertySet
    )
    if (! (Property in PropertySet)) {
      console.warn('unsupported folder property "' + Property + '"')
      return
    }

    try {
// @ts-ignore TS7053 allow indexing of "Folder"
      Folder[Property] = Value
    } catch (Signal:any) {
      console.warn('unsupported "' + Property + '" value received')
      return
    }
  }

/**** attachBoard ****/

  export function attachBoard (
    Project:SNS_Project, BoardId:SNS_Id, FolderId:SNS_Id, Index:SNS_Ordinal
  ):void {
    expectProject    ('SNS project',Project)
    expectId            ('board id',BoardId)
    expectId           ('folder id',FolderId)
    expectOrdinal('insertion index',Index)

    if (BoardId === Project.Id) {
      console.error('the given "BoardId" is the id of the current project')
      return
    }

    let Board = Project.BoardWithId(BoardId)
    if (Board == null) {
      console.error('no board with the given "BoardId" found')
      return
    }

    let newFolder = Project.FolderWithId(FolderId)
    if (newFolder == null) {
      console.error('no folder with the given "FolderId" found')
      return
    }

    if (Board === newFolder) {
      console.error('cannot attach a board to itself')
      return
    }

    if (Board.containsFolder(newFolder)) {
      console.error('cannot attach an outer board to one of its inner boards')
      return
    }

    const oldFolder = Board.Folder
    switch (true) {
      case (oldFolder === newFolder):
        setTimeout(() => sanitizeBoardList(Project,oldFolder,Board,Index),0);  break
      case (oldFolder != null):
        setTimeout(() => sanitizeBoardList(Project,oldFolder,Board),0)
    }

    newFolder._attachBoardAt(Board,Index)
  }

/**** detachBoard ****/

  export function detachBoard (
    Project:SNS_Project, BoardId:SNS_Id, FolderId:SNS_Id, Index:SNS_Ordinal
  ):void {
    expectProject    ('SNS project',Project)
    expectId            ('board id',BoardId)
    expectId           ('folder id',FolderId)
    expectOrdinal('insertion index',Index)

    if (BoardId === Project.Id) {
      console.error('the given "BoardId" is the id of the current project')
      return
    }

    let Board = Project.BoardWithId(BoardId)
    if (Board == null) { return }                     // operation is idempotent

    let oldFolder = Project.FolderWithId(FolderId)
    if (oldFolder == null) { return }                 // operation is idempotent

    if ((Board.Folder === oldFolder) && (oldFolder.Board(Index) === Board)) {
      oldFolder._detachBoardAt(Index)
    }
  }

/**** destroyBoard ****/

  export function destroyBoard (
    Project:SNS_Project, BoardId:SNS_Id
  ):void {
    expectProject('SNS project',Project)
    expectId        ('board id',BoardId)

    if (BoardId === Project.Id) {
      console.error('the given "BoardId" is the id of the current project')
      return
    }

    let Board = Project.BoardWithId(BoardId)
    if (Board == null) { return }                     // operation is idempotent

    if (
      (Board.Folder != null) || (Board.BoardCount > 0) || (Board.StickerCount > 0)
    ) {
      console.error('cannot destroy a board that is still in use')
      return
    }

// @ts-ignore TS2322 allow _Project to become undefined upon deletion
    Board._Project = undefined           // detaches this board from the project
    unregisterFolder(Board)
  }

/**** createSticker ****/

  export function createSticker (
    Project:SNS_Project, StickerId:SNS_Id
  ):void {
    expectProject('SNS project',Project)
    expectId      ('sticker id',StickerId)

    let Sticker = Project.StickerWithId(StickerId)
    if (Sticker != null) {
      console.error('a sticker with the given "StickerId" exists already')
      return
    }

    Sticker = new SNS_Sticker(Project,StickerId)  // will automat. be registered
  }

/**** configureSticker ****/

  export function configureSticker (
    Project:SNS_Project, StickerId:SNS_Id, Property:SNS_Identifier, Value:any
  ):void {
    expectProject           ('SNS project',Project)
    expectId                 ('sticker id',StickerId)
    expectIdentifier('property identifier',Property)

    let Sticker = Project.StickerWithId(StickerId)
    if (Sticker == null) {                                // should never happen
      console.error('no sticker with the given "StickerId" found')
      return
    }

    if (! (Property in SNS_StickerPropertySet)) {
      console.warn('unsupported sticker property "' + Property + '"')
      return
    }

    try {
// @ts-ignore TS7053 allow indexing of "Sticker"
      Sticker[Property] = Value
    } catch (Signal:any) {
      console.warn('unsupported "' + Property + '" value received')
      return
    }
  }

/**** attachSticker ****/

  export function attachSticker (
    Project:SNS_Project, StickerId:SNS_Id, BoardId:SNS_Id, Index:SNS_Ordinal
  ):void {
    expectProject    ('SNS project',Project)
    expectId          ('sticker id',StickerId)
    expectId            ('board id',BoardId)
    expectOrdinal('insertion index',Index)

    let Sticker = Project.StickerWithId(StickerId)
    if (Sticker == null) {
      console.error('no sticker with the given "StickerId" found')
      return
    }

    let newBoard = Project.BoardWithId(BoardId)
    if (newBoard == null) {
      console.error('no board with the given "BoardId" found')
      return
    }

    const oldBoard = Sticker.Board
    switch (true) {
      case (oldBoard === newBoard):
        setTimeout(() => sanitizeStickerList(Project,oldBoard,Sticker,Index),0);  break
      case (oldBoard != null):
        setTimeout(() => sanitizeStickerList(Project,oldBoard,Sticker),0)
    }

    newBoard._attachStickerAt(Sticker,Index)
  }

/**** detachSticker ****/

  export function detachSticker (
    Project:SNS_Project, StickerId:SNS_Id, BoardId:SNS_Id, Index:SNS_Ordinal
  ):void {
    expectProject    ('SNS project',Project)
    expectId          ('sticker id',StickerId)
    expectId            ('board id',BoardId)
    expectOrdinal('insertion index',Index)

    let Sticker = Project.StickerWithId(StickerId)
    if (Sticker == null) { return }                   // operation is idempotent

    let oldBoard = Project.BoardWithId(BoardId)
    if (oldBoard == null) { return }                  // operation is idempotent

    if ((Sticker.Board === oldBoard) && (oldBoard.Sticker(Index) === Sticker)) {
      oldBoard._detachStickerAt(Index)
    }
  }

/**** destroySticker ****/

  export function destroySticker (
    Project:SNS_Project, StickerId:SNS_Id
  ):void {
    expectProject('SNS project',Project)
    expectId      ('sticker id',StickerId)

    let Sticker = Project.StickerWithId(StickerId)
    if (Sticker == null) { return }                   // operation is idempotent

    if (Sticker.Board != null) {
      console.error('cannot destroy a sticker that is still in use')
      return
    }

// @ts-ignore TS2322 allow _Project to become undefined upon deletion
    Sticker._Project = undefined       // detaches this sticker from the project
    unregisterSticker(Sticker)
  }

/**** sanitizeBoardList ****/

  export function sanitizeBoardList (
    Project:SNS_Project, Folder:SNS_Folder, Board:SNS_Board, Index?:SNS_Ordinal
  ):void {
    expectProject('SNS project',Project)
    expectFolder      ('folder',Folder)
    expectBoard        ('board',Board)
    allowOrdinal       ('index',Index) // undefined means: always detach "Board"

    let BoardSet:Set<SNS_Board> = new Set()

    const BoardList = Folder.BoardList
    for (let i = BoardList.length-1; i >= 0; i--) {
      const BoardFromList = BoardList[i]
      if (
        (BoardFromList.Folder !== Folder) ||//"Board" doesn't belong to "Folder"
        (BoardFromList === Board) && (Index !== i) ||
        BoardSet.has(BoardFromList)           // "Board" already occurred before
      ) {
        Folder._detachBoardAt(i)
      } else {
        BoardSet.add(BoardFromList)
      }
    }
  }

/**** sanitizeStickerList ****/

  export function sanitizeStickerList (
    Project:SNS_Project, Board:SNS_Board, Sticker:SNS_Sticker, Index?:SNS_Ordinal
  ):void {
    expectProject('SNS project',Project)
    expectBoard        ('board',Board)
    expectSticker    ('sticker',Sticker)
    allowOrdinal       ('index',Index)  // undef. means: always detach "Sticker"

    let StickerSet:Set<SNS_Sticker> = new Set()

    const StickerList = Board.StickerList
    for (let i = StickerList.length-1; i >= 0; i--) {
      const StickerFromList = StickerList[i]
      if (
        (StickerFromList.Board !== Board) ||      // "Sticker" belongs elsewhere
        (StickerFromList === Sticker) && (Index !== i) ||
        StickerSet.has(StickerFromList)     // "Sticker" already occurred before
      ) {
        Board._detachStickerAt(i)
      } else {
        StickerSet.add(StickerFromList)
      }
    }
  }

//------------------------------------------------------------------------------
//--                          Configuration Defaults                          --
//------------------------------------------------------------------------------

  const defaultStickerGeometry = { x:20,y:20, Width:80,Height:60 }
  const defaultMinWidth  = 10
  const defaultMaxWidth  = undefined
  const defaultMinHeight = 10
  const defaultMaxHeight = undefined

  const defaultGridWidth  = 10
  const defaultGridHeight = 10

//------------------------------------------------------------------------------
//--                               Acceptables                                --
//------------------------------------------------------------------------------

/**** acceptableBoolean ****/

  export function acceptableBoolean (Value:any, Default:boolean):boolean {
    return (ValueIsBoolean(Value) ? Value : Default)
  }

/**** acceptableOptionalBoolean ****/

  export function acceptableOptionalBoolean (
    Value:any, Default?:boolean|undefined
  ):boolean|undefined {
    return (
      Value == null
      ? undefined
      : ValueIsBoolean(Value) ? Value : Default
    )
  }

/**** acceptableNumber ****/

  export function acceptableNumber (Value:any, Default:number):number {
    return (ValueIsNumber(Value) ? Value : Default)
  }

/**** acceptableOptionalNumber ****/

  export function acceptableOptionalNumber (
    Value:any, Default?:number|undefined
  ):number|undefined {
    return (ValueIsNumber(Value) ? Value : Default)
  }

/**** acceptableNumberInRange ****/

  export function acceptableNumberInRange (
    Value:any, Default:number,
    minValue:number = -Infinity, maxValue:number = Infinity,
    withMin:boolean = false, withMax:boolean = false
  ):number {
    return (ValueIsNumberInRange(Value,minValue,maxValue,withMin,withMax) ? Value : Default)
  }

/**** acceptableOptionalNumberInRange ****/

  export function acceptableOptionalNumberInRange (
    Value:any, Default:number|undefined,
    minValue:number = -Infinity, maxValue:number = Infinity,
    withMin:boolean = false, withMax:boolean = false
  ):number|undefined {
    return (
      ValueIsNumberInRange(Value,minValue,maxValue,withMin,withMax)
      ? Value
      : Default
    )
  }

/**** acceptableInteger ****/

  export function acceptableInteger (Value:any, Default:number):number {
    return (ValueIsInteger(Value) ? Value : Default)
  }

/**** acceptableOptionalInteger ****/

  export function acceptableOptionalInteger (
    Value:any, Default:number|undefined
  ):number|undefined {
    return (ValueIsInteger(Value) ? Value : Default)
  }

/**** acceptableIntegerInRange ****/

  export function acceptableIntegerInRange (
    Value:any, Default:number, minValue:number = -Infinity, maxValue:number = Infinity
  ):number {
    return (ValueIsIntegerInRange(Value,minValue,maxValue) ? Value : Default)
  }

/**** acceptableOptionalIntegerInRange ****/

  export function acceptableOptionalIntegerInRange (
    Value:any, Default:number|undefined,
    minValue:number = -Infinity, maxValue:number = Infinity
  ):number|undefined {
    return (ValueIsIntegerInRange(Value,minValue,maxValue) ? Value : Default)
  }

/**** acceptableOrdinal ****/

  export function acceptableOrdinal (Value:any, Default:number):number {
    return (ValueIsOrdinal(Value) ? Value : Default)
  }

/**** acceptableOptionalOrdinal ****/

  export function acceptableOptionalOrdinal (
    Value:any, Default?:number|undefined
  ):number|undefined {
    return (ValueIsOrdinal(Value) ? Value : Default)
  }

/**** acceptableString ****/

  export function acceptableString (Value:any, Default:string):string {
    return (ValueIsString(Value) ? Value : Default)
  }

/**** acceptableOptionalString ****/

  export function acceptableOptionalString (
    Value:any, Default?:string|undefined
  ):string|undefined {
    return (ValueIsString(Value) ? Value : Default)
  }

/**** acceptableNonEmptyString ****/

  export function acceptableNonEmptyString (Value:any, Default:string):string {
    return (ValueIsString(Value) && (Value.trim() !== '') ? Value : Default)
  }

/**** acceptableOptionalNonEmptyString ****/

  export function acceptableOptionalNonEmptyString (
    Value:any, Default?:string|undefined
  ):string|undefined {
    return (ValueIsString(Value) && (Value.trim() !== '') ? Value : Default)
  }

/**** acceptableStringMatching ****/

  export function acceptableStringMatching (
    Value:any, Default:string, Pattern:RegExp
  ):string {
    return (ValueIsStringMatching(Value,Pattern) ? Value : Default)
  }

/**** acceptableOptionalStringMatching ****/

  export function acceptableOptionalStringMatching (
    Value:any, Default:string|undefined, Pattern:RegExp
  ):string|undefined {
    return (ValueIsStringMatching(Value,Pattern) ? Value : Default)
  }

/**** acceptableText ****/

  const noCtrlCharsButCRLFTABPattern = /^[^\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/

  export function acceptableText (Value:any, Default:string):string {
    return (ValueIsStringMatching(Value,noCtrlCharsButCRLFTABPattern) ? Value : Default)
  }

/**** acceptableOptionalText ****/

  export function acceptableOptionalText (
    Value:any, Default?:string|undefined
  ):string|undefined {
    return (ValueIsText(Value) ? Value : Default)
  }

/**** acceptableTextline ****/

  export function acceptableTextline (Value:any, Default:string):string {
    return (ValueIsTextline(Value) ? Value : Default).replace(
      /[\f\r\n\v\u0085\u2028\u2029].*$/,'...'
    )
  }

/**** acceptableOptionalTextline ****/

  export function acceptableOptionalTextline (
    Value:any, Default?:string|undefined
  ):string|undefined {
    const Result = ValueIsTextline(Value) ? Value : Default
    return (
      Result == null
      ? undefined
      : Result.replace(/[\f\r\n\v\u0085\u2028\u2029].*$/,'...')
    )
  }

/**** acceptableFunction ****/

  export function acceptableFunction (Value:any, Default:Function):Function {
    return (ValueIsFunction(Value) ? Value : Default)
  }

/**** acceptableOptionalFunction ****/

  export function acceptableOptionalFunction (
    Value:any, Default?:Function|undefined
  ):Function|undefined {
    return (ValueIsFunction(Value) ? Value : Default)
  }

/**** acceptableList ****/

  export function acceptableList (Value:any, Default:any[]):any[] {
    return (ValueIsList(Value) ? Value : Default)
  }

/**** acceptableOptionalList ****/

  export function acceptableOptionalList (
    Value:any, Default?:any[]|undefined
  ):any[]|undefined {
    return (ValueIsList(Value) ? Value : Default)
  }

/**** acceptableListSatisfying ****/

  export function acceptableListSatisfying (
    Value:any, Default:any[], Matcher:Function
  ):any[] {
    return (ValueIsListSatisfying(Value,Matcher) ? Value : Default)
  }

/**** acceptableOptionalListSatisfying ****/

  export function acceptableOptionalListSatisfying (
    Value:any, Default:any[]|undefined, Matcher:Function
  ):any[]|undefined {
    return (ValueIsListSatisfying(Value,Matcher) ? Value : Default)
  }

/**** acceptableColor ****/

  export function acceptableColor (Value:any, Default:string):string {
    return (ValueIsColor(Value) ? Value : Default)
  }

/**** acceptableOptionalColor ****/

  export function acceptableOptionalColor (
    Value:any, Default?:string|undefined
  ):string|undefined {
    return (ValueIsColor(Value) ? Value : Default)
  }

/**** acceptableEMailAddress ****/

  export function acceptableEMailAddress (Value:any, Default:string):string {
    return (ValueIsEMailAddress(Value) ? Value : Default)
  }

/**** acceptablePhoneNumber ****/

  export function acceptablePhoneNumber (Value:any, Default:string):string {
    return (ValueIsPhoneNumber(Value) ? Value : Default)
  }

/**** acceptableURL ****/

  export function acceptableURL (Value:any, Default:string):string {
    return (ValueIsURL(Value) ? Value : Default)
  }

//------------------------------------------------------------------------------
//--                             basic Renderers                              --
//------------------------------------------------------------------------------

/**** default Renderer ****/

  function DefaultRenderer (this:SNS_Visual):any {
    return html`<div class="SNS DefaultSticker" style=${CSSStyleOfVisual(this)}/>`
  }

/**** Error Renderer ****/

  function ErrorRenderer (this:SNS_Visual):any {
// @ts-ignore TS2532 "ErrorRenderer.call(this)" will define "this"
    const Error = this.Error
    if (Error == null) { return DefaultRenderer.call(this) }// should never happen

// @ts-ignore TS2532 "ErrorRenderer.call(this)" will define "this"
    const onClick = () => this.Project.showError(this,Error)

    return html`<div class="SNS brokenSticker">
      <div class="SNS ErrorIndicator" onClick=${onClick}/>
    </div>`
  }

//------------------------------------------------------------------------------
//--                               Id Handling                                --
//------------------------------------------------------------------------------

/**** newId - uses nanoid with custom dictionary ****/

  export const newId = customAlphabet(nolookalikesSafe,21)

/**** registerFolder ****/

  const FolderRegistryForProject:WeakMap<SNS_Project,Indexable> = new WeakMap()

  function registerFolder (Project:SNS_Project, Folder:SNS_Folder):void {
    let FolderRegistry = FolderRegistryForProject.get(Project)
    if (FolderRegistry == null) {
      FolderRegistryForProject.set(Project,FolderRegistry = Object.create(null))
    }

    const Id = Folder.Id
// @ts-ignore TS18048 "FolderRegistry" is not undefined
    if (Id in FolderRegistry) throwError(
      'NonUniqueId: the id of the given folder (' + quoted(Id) +
      ') has already been registered'
    )

// @ts-ignore TS18048 "FolderRegistry" is not undefined
    FolderRegistry[Id] = Folder
  }

/**** unregisterFolder ****/

  function unregisterFolder (Folder:SNS_Folder):void {
    const Project = Folder.Project

    let FolderRegistry = FolderRegistryForProject.get(Project)
    if (FolderRegistry == null) { return }

    delete FolderRegistry[Folder.Id]
  }

/**** FolderWithId ****/

  function FolderWithId (Project:SNS_Project, Id:SNS_Id):SNS_Folder|undefined {
    let FolderRegistry = FolderRegistryForProject.get(Project)
    if (FolderRegistry == null) { return undefined }

    return FolderRegistry[Id]
  }

/**** registerSticker ****/

  const StickerRegistryForProject:WeakMap<SNS_Project,Indexable> = new WeakMap()

  function registerSticker (Project:SNS_Project, Sticker:SNS_Sticker):void {
    let StickerRegistry = StickerRegistryForProject.get(Project)
    if (StickerRegistry == null) {
      StickerRegistryForProject.set(Project,StickerRegistry = Object.create(null))
    }

    const Id = Sticker.Id
// @ts-ignore TS18048 "StickerRegistry" is not undefined
    if (Id in StickerRegistry) throwError(
      'NonUniqueId: the id of the given sticker (' + quoted(Id) +
      ') has already been registered'
    )

// @ts-ignore TS18048 "StickerRegistry" is not undefined
    StickerRegistry[Id] = Sticker
  }

/**** unregisterSticker ****/

  function unregisterSticker (Sticker:SNS_Sticker):void {
    const Project = Sticker.Project

    let StickerRegistry = StickerRegistryForProject.get(Project)
    if (StickerRegistry == null) { return }

    delete StickerRegistry[Sticker.Id]
  }

/**** StickerWithId ****/

  function StickerWithId (Project:SNS_Project, Id:SNS_Id):SNS_Sticker|undefined {
    let StickerRegistry = StickerRegistryForProject.get(Project)
    if (StickerRegistry == null) { return undefined }

    return StickerRegistry[Id]
  }

/**** removeIdsFrom ****/

  export function removeIdsFrom (Serialization:Serializable) {
    expectSerializable('serialization',Serialization)

    delete Serialization.Id

    if (ValueIsList(Serialization.BoardList)) {
      (Serialization.BoardList as Serializable[]).forEach(
        (Serialization:Serializable) => removeIdsFrom(Serialization)
      )
    }

    if (ValueIsList(Serialization.StickerList)) {
      (Serialization.StickerList as Serializable[]).forEach(
        (Serialization:Serializable) => removeIdsFrom(Serialization)
      )
    }
  }

//------------------------------------------------------------------------------
//--                           Reactivity Handling                            --
//------------------------------------------------------------------------------

  const reactiveFunctionsForVisual:WeakMap<SNS_Visual,Function[]>  = new WeakMap()

/**** registerReactiveFunctionIn ****/

  function registerReactiveFunctionIn (
    Visual:SNS_Visual, reactiveFunction:Function
  ):void {
    let reactiveFunctions = reactiveFunctionsForVisual.get(Visual)
    if (reactiveFunctions == null) {
      reactiveFunctionsForVisual.set(Visual,reactiveFunctions = [])
    }
    reactiveFunctions.push(reactiveFunction)
  }

/**** unregisterAllReactiveFunctionsFrom ****/

  function unregisterAllReactiveFunctionsFrom (Visual:SNS_Visual):void {
    let reactiveFunctions = reactiveFunctionsForVisual.get(Visual)
    if (reactiveFunctions == null) { return }

    reactiveFunctions.forEach((reactiveFunction:Function) => {
      dispose(reactiveFunction)
    })
  }

//------------------------------------------------------------------------------
//--                            Behavior Handling                             --
//------------------------------------------------------------------------------

  type SNS_groupedBehaviorSet = { [GroupLabel:string]:SNS_BehaviorSetGroup }
  type SNS_BehaviorSetGroup   = { GroupLabel:SNS_Textline, BehaviorSet:SNS_BehaviorSet }
  type SNS_BehaviorSet        = { [BehaviorName:string]:SNS_Behavior }
  type SNS_Behavior           = { Label:SNS_Textline, Executable?:Function, Template:Serializable }

  const groupedBehaviorRegistry:SNS_groupedBehaviorSet          = Object.create(null)
  const BehaviorRegistry:{ [BehaviorName:string]:Function }     = Object.create(null)
  const TemplateRegistry:{ [BehaviorName:string]:Serializable } = Object.create(null)

/**** registerBehavior ****/

  function registerBehavior (
    GroupLabel:SNS_Textline, BehaviorLabel:SNS_Textline,
    BehaviorName:SNS_Identifier, Template?:Serializable,
    BehaviorFunction?:Function, BehaviorStyle?:SNS_Text
  ):void {
    expectTextline('behavior group label',GroupLabel)
    expectTextline      ('behavior label',BehaviorLabel)
    expectIdentifier     ('behavior name',BehaviorName)
    allowPlainObject  ('sticker template',Template)
    allowFunction    ('behavior function',BehaviorFunction)

    const normalizedGroupName    = GroupLabel.toLowerCase().replace(/\s/g,'')
    const normalizedBehaviorName = BehaviorName.toLowerCase()

    const normalizedTemplate = { ...Template }
    if (normalizedTemplate.activeScript == null) {
      normalizedTemplate.activeScript = `useBehavior('${BehaviorName}')\n`
    } else {
      normalizedTemplate.activeScript = (
        (normalizedTemplate.activeScript as SNS_Text).replace(/^\s*\n/,'').replace(/\n\s*$/,'\n')
      )
    }

    if (normalizedBehaviorName in BehaviorRegistry) throwError(
      'BehaviorExists: behavior ' + quoted(BehaviorName) + ' was already registered'
    )

    let BehaviorSetGroup = groupedBehaviorRegistry[normalizedGroupName]
    if (BehaviorSetGroup == null) {
      groupedBehaviorRegistry[normalizedGroupName] = BehaviorSetGroup = {
        GroupLabel, BehaviorSet:Object.create(null)
      }
    }

    BehaviorSetGroup.BehaviorSet[BehaviorName] = {
      Label:BehaviorLabel, Executable:BehaviorFunction, Template:normalizedTemplate
    }

    if (BehaviorFunction != null) {
      TemplateRegistry[normalizedBehaviorName] = normalizedTemplate
      BehaviorRegistry[normalizedBehaviorName] = BehaviorFunction
    }

    if (BehaviorStyle != null) {
      if (BehaviorStyleElement.innerHTML.indexOf(BehaviorStyle.trim()) < 0) {
        BehaviorStyleElement.innerHTML += BehaviorStyle
      }
    }
  }

/**** groupedBehaviorEntryList ****/

  export type SNS_groupedBehaviorEntryList = SNS_BehaviorEntryGroup[]
  export type SNS_BehaviorEntryGroup = {
    GroupLabel:SNS_Textline,
    BehaviorEntryList:SNS_BehaviorEntry[]
  }
  export type SNS_BehaviorEntry = {
    Label:SNS_Textline, Name:SNS_Identifier, disabled:boolean
  }

  export function groupedBehaviorEntryList ():SNS_groupedBehaviorEntryList {
    const Result:SNS_groupedBehaviorEntryList = []
      function BehaviorEntriesIn (BehaviorGroup:SNS_BehaviorSetGroup):SNS_BehaviorEntryGroup {
        const BehaviorEntryList:SNS_BehaviorEntry[] = []
          const BehaviorSet = BehaviorGroup.BehaviorSet
          for (let BehaviorName in BehaviorSet) {
            BehaviorEntryList.push({
              Label:BehaviorSet[BehaviorName].Label, Name:BehaviorName,
              disabled:! (BehaviorName.toLowerCase() in BehaviorRegistry)
            })
          }
        return { GroupLabel:BehaviorGroup.GroupLabel, BehaviorEntryList }
      }

      for (let GroupLabel in groupedBehaviorRegistry) {
        Result.push(BehaviorEntriesIn(groupedBehaviorRegistry[GroupLabel]))
      }
    return Result
  }

/**** useBehavior ****/

  function useBehavior (this:SNS_Visual, BehaviorName:SNS_Identifier):void {
    expectSticker          ('visual',this)
    expectIdentifier('behavior name',BehaviorName)

    const BehaviorFunction = BehaviorRegistry[BehaviorName.toLowerCase()]
    if (BehaviorFunction == null) throwError(
      'NoSuchBehavior: no behavior called ' + quoted(BehaviorName) + ' found'
    )

    const reactively = (reactiveFunction:Function):void => {
      expectFunction('reactive function',reactiveFunction)
// @ts-ignore TS2345 do not care about the specific signature of "reactiveFunction"
      registerReactiveFunctionIn(this,computed(reactiveFunction))
    }

    const onRender  = this.onRender.bind(this)
    const onMount   = this.onMount.bind(this)
    const onUnmount = this.onUnmount.bind(this)

    BehaviorFunction.call(
      this, this,this, html,reactively, onRender,onMount,onUnmount
    )
  }

/**** TemplateOfBehavior ****/

  export function TemplateOfBehavior (BehaviorName:SNS_Identifier):Serializable {
    expectIdentifier('behavior name',BehaviorName)

    const normalizedBehaviorName = BehaviorName.toLowerCase()

    const BehaviorFunction = BehaviorRegistry[normalizedBehaviorName]
    if (BehaviorFunction == null) throwError(
      'NoSuchBehavior: no behavior called ' + quoted(BehaviorName) + ' found'
    )

    return TemplateRegistry[normalizedBehaviorName]
  }

//------------------------------------------------------------------------------
//--                           intrinsic Behaviors                            --
//------------------------------------------------------------------------------

  type IndexableSticker = SNS_Sticker & Indexable

/**** plain Sticker ****/

  registerBehavior('basic Views', 'plain Sticker', 'plainSticker', {
    Geometry:{ x:20,y:20, Width:100,Height:80 },
    activeScript:'onRender(() => html`<div class="SNS Placeholder">Script me!</div>`)',
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    onRender(() => html`<div class="SNS plainSticker"></div>`)
  },`
/**** plain Stickers ****/

  .SNS.plainSticker {
    border:dotted 1px gray;
  }
  `)

/**** sticky Note ****/

  registerBehavior('basic Views', 'sticky Note', 'stickyNote', {
    Selectability:true,
    Geometry:{ x:20,y:20, Width:100,Height:80 },
    minWidth:20, minHeight:10,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Selectability = true                       // for backwards compatibility

    my.Renderer = function (PropSet:Indexable) {
      const { builtinSelection,builtinDragging } = PropSet

      const Value = acceptableText(my.Value,'')

      const onKeyDown = (Event:KeyboardEvent) => {
        if (Event.key === 'Tab') {
          Event.stopPropagation()
          Event.preventDefault()

          const Editor = Event.target as HTMLTextAreaElement
          const { value, selectionStart,selectionEnd } = Editor
            Editor.value = value.slice(0,selectionStart) + '\t' + value.slice(selectionEnd)
          Editor.selectionStart = Editor.selectionEnd = selectionStart+1

          return false
        }
      }

      const onInput = (Event:InputEvent) => {
        my.Value = (Event.target as HTMLTextAreaElement).value
      }

      return html`<div class="SNS NoteSticker" style=${CSSStyleOfVisual(me)}
        onPointerDown=${builtinSelection}
      >
        <div class="Header builtinDraggable"
          onPointerDown=${builtinDragging} onPointerMove=${builtinDragging}
          onPointerUp=${builtinDragging} onPointerCancel=${builtinDragging}
        />
        <textarea class="Editor" value=${Value} tabindex=-1
          onKeyDown=${onKeyDown} onInput=${onInput}
        ></textarea>
      </div>`
    }
  },`
/**** "classical" Note Stickers ****/

  .SNS.NoteSticker {
    background:ivory;
    border:solid 1px darkgray;
    outline:none;
    font-family:'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size:14px; font-weight:normal; line-height:1.4; color:black;
  }

  .SNS.NoteSticker > .Header {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; height:10px;
    margin:0px; padding:0px;
    background:#000000; opacity:0.3;
  }

  .SNS.NoteSticker > .Editor {
    display:block; position:absolute;
    left:0px; top:10px; right:0px; bottom:0px;
    margin:0px; padding:2px;
    background:none; border:none;

    background-color:inherit; background-image:inherit;
    font-family:inherit; font-size:inherit; font-weight:inherit;
    line-height:inherit; color:inherit;

    tab-size:10px; resize:none;
  }
  `)

/**** Placeholder ****/

  registerBehavior('basic Views', 'Placeholder', 'Placeholder', {
    Selectability:true,
    Geometry:{ x:20,y:20, Width:100,Height:80 },
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Selectability = true                       // for backwards compatibility

    my.Renderer = function (PropSet:Indexable) {
      const { builtinDragging } = PropSet
      const { Width,Height }    = my.Geometry

      return html`<div class="SNS Placeholder builtinDraggable" style="
        line-height:${Height}px;
      "
        onPointerDown=${builtinDragging} onPointerMove=${builtinDragging}
        onPointerUp=${builtinDragging} onPointerCancel=${builtinDragging}
      >${Width}x${Height}</div>`
    }
  },`
/**** simple Placeholders ****/

  .SNS.Placeholder {
    border:dotted 1px gray;
    text-align:center;
  }
  `)

/**** Outline - e.g., for screenshot areas ****/

  registerBehavior('basic Views', 'Outline', 'Outline', {
    Geometry:{ x:20,y:20, Width:100,Height:80 },
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function (PropSet:Indexable) {
      return html`<div class="SNS Outline"/>`
    }
  },`
/**** Outline ****/

  .SNS.Outline {
    outline:dotted 1px blue;
    outline-offset:2px;
    pointer-events:none;
  }
  `)

/**** Title View ****/

  registerBehavior('basic Views', 'Title', 'Title', {
    Geometry:{ x:20,y:20, Width:80,Height:30 },
    Value:'Title',
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    onRender(() => {
      const Value = acceptableTextline(my.Value,'')
      return html`<div class="SNS Title" style=${my.CSSStyle}>${Value}</div>`
    })
  },`
/**** Title Views ****/

  .SNS.Sticker > .SNS.Title {
    font-size:22px; font-weight:bold; line-height:32px;
  }
  `)

/**** Subtitle View ****/

  registerBehavior('basic Views', 'Subtitle', 'Subtitle', {
    Geometry:{ x:20,y:20, Width:80,Height:30 },
    Value:'Subtitle',
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    onRender(() => {
      const Value = acceptableTextline(my.Value,'')
      return html`<div class="SNS Subtitle" style=${my.CSSStyle}>${Value}</div>`
    })
  },`
/**** Subtitle Views ****/

  .SNS.Sticker > .SNS.Subtitle {
    font-size:18px; font-weight:bold; line-height:27px;
  }
  `)

/**** Label View ****/

  registerBehavior('basic Views', 'Label', 'Label', {
    Geometry:{ x:20,y:20, Width:80,Height:30 },
    Value:'Label',
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    onRender(() => {
      const Value = acceptableTextline(my.Value,'')
      return html`<div class="SNS Label" style=${my.CSSStyle}>${Value}</div>`
    })
  },`
/**** Label Views ****/

  .SNS.Sticker > .SNS.Label {
    font-size:14px; font-weight:bold; line-height:21px;
  }
  `)

/**** Text View ****/

  registerBehavior('basic Views', 'Text', 'Text', {
    Geometry:{ x:20,y:20, Width:80,Height:30 },
    Value:'Text',
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    onRender(() => {
      const Value = acceptableText(my.Value,'')
      return html`<div class="SNS Text" style=${my.CSSStyle}>${Value}</div>`
    })
  },`
/**** Text Views ****/

  .SNS.Sticker > .SNS.Text {
    font-size:14px; font-weight:normal; line-height:21px;
  }
  `)

/**** FinePrint View ****/

  registerBehavior('basic Views', 'FinePrint', 'FinePrint', {
    Geometry:{ x:20,y:20, Width:80,Height:30 },
    Value:'FinePrint',
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    onRender(() => {
      const Value = acceptableText(my.Value,'')
      return html`<div class="SNS FinePrint" style=${my.CSSStyle}>${Value}</div>`
    })
  },`
/**** FinePrint Views ****/

  .SNS.Sticker > .SNS.FinePrint {
    font-size:12px; font-weight:normal; line-height:18px;
  }
  `)

/**** HTML View ****/

  registerBehavior('basic Views', 'HTML View', 'HTMLView', {
    Geometry:{ x:20,y:20, Width:100,Height:80 },
    Value:'<b><u>HTML View</u></b>',
    activeScript:`
useBehavior('HTMLView')
//my.Value = 'HTML Markup'
`,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = () => html`<div class="SNS HTMLView"
      dangerouslySetInnerHTML=${{__html:acceptableText(my.Value,'')}}
    />`
  })

/**** Image View ****/

  registerBehavior('basic Views', 'Image View', 'ImageView', {
    Geometry:{ x:20,y:20, Width:90,Height:90 },
    Value:'https://www.rozek.de/Bangle.js/Mandelbrot_240x240.png',
    activeScript:`
useBehavior('ImageView')
//my.Value = 'Image URL'
`,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = () => html`<img class="SNS ImageView" src=${acceptableURL(my.Value,'')}/>`
  },`
/**** Image View ****/

  .SNS.Sticker > .SNS.ImageView {
    object-fit:contain; object-position:center;
  }
  `)

/**** SVG View ****/

  registerBehavior('basic Views', 'SVG View', 'SVGView', {
    Geometry:{ x:20,y:20, Width:90,Height:90 },
    activeScript:`
useBehavior('SVGView')
//my.Value = 'SVG Document'
`,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = () => {
      const DataURL = 'data:image/svg+xml;base64,' + btoa(acceptableText(my.Value,''))
      return html`<img class="SNS SVGView" src=${DataURL}/>`
    }
  },`
/**** SVG View ****/

  .SNS.Sticker > .SNS.SVGView {
    object-fit:contain; object-position:center;
  }
  `)

/**** 2D Canvas View ****/

  registerBehavior('basic Views', '2D Canvas View', 'Canvas2DView')

/**** Web View ****/

  registerBehavior('basic Views', 'Web View', 'WebView', {
    Geometry:{ x:20,y:20, Width:640,Height:480 },
    minWidth:120, minHeight:80,
    Value:'https://www.rozek.de',
    activeScript:`
useBehavior('WebView')
//my.Value = 'Document URL'
`,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = () => html`<iframe class="SNS WebView"
      src=${acceptableURL(my.Value,'')}
    />`
  })

/**** Badge ****/

  registerBehavior('basic Views', 'Badge', 'Badge', {
    Geometry:{ x:20,y:20, Width:30,Height:30 },
    Value:1, ForegroundColor:'red', BackgroundColor:'white',
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = () => {
      const Value = (
        ValueIsNumber(my.Value)
        ? ''+my.Value
        : acceptableTextline(my.Value,'')
      )
      const BorderRadius = Math.round(Math.min(my.Width,my.Height/2))

      return html`<div class="SNS Badge" style="
        border-color:${my.ForegroundColor}; border-radius:${BorderRadius}px;
        line-height:${my.Height-4}px;
      ">${acceptableTextline(Value,'')}</>`
    }
  },`
/**** Badge ****/

  .SNS.Sticker > .SNS.Badge {
    font-size:18px; font-weight:bold; text-align:center;
    border:solid 2px black;
  }
  `)

/**** Icon ****/

  registerBehavior('basic Views', 'Icon', 'Icon', {
    Geometry:{ x:20,y:20, Width:24,Height:24 },
    Value:null,
    activeScript:`
useBehavior('Icon')
//my.Value = 'icon image url'
//onClick(() => ...)
`,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    function onClick (Event:any):void {
      if (my.Enabling == false) { return }

      my.Value = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onClick === 'function') { my._onClick(Event) }
    }

    my.Renderer = () => {
      const Value = acceptableURL(my.Value,'./icons/pencil.png')
      const Color = acceptableColor(my.Color,'black')

      return html`<div class="SNS Icon" style="
        -webkit-mask-image:url(${Value}); mask-image:url(${Value});
        background-color:${Color};
      " disabled=${my.Enabling == false} onClick=${onClick}
      />`
    }
  },`
/**** Icon ****/

  .SNS.Sticker > .SNS.Icon {
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  `)

/**** horizontalSeparator ****/

  registerBehavior('basic Views', 'horizontal Separator', 'horizontalSeparator', {
    Geometry:{ x:20,y:20, Width:80,Height:10 },
    minWidth:10,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    onRender(() => html`<div class="SNS horizontalSeparator"></div>`)
  },`
/**** horizontal Separator ****/

  .SNS.horizontalSeparator {
    border:none; border-top:solid 1px black;
  }
  `)


/**** verticalSeparator ****/

  registerBehavior('basic Views', 'vertical Separator', 'verticalSeparator', {
    Geometry:{ x:20,y:20, Width:10,Height:40 },
    minHeight:10,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    onRender(() => html`<div class="SNS verticalSeparator"></div>`)
  },`
/**** vertical Separator ****/

  .SNS.verticalSeparator {
    border:none; border-left:solid 1px black;
  }
  `)

/**** Tab ****/

  registerBehavior('basic Views', 'Tab', 'Tab')

/**** IconTab ****/

  registerBehavior('basic Views', 'Icon Tab', 'IconTab')

/**** Button ****/

  registerBehavior('native Controls', 'Button', 'Button', {
    Geometry:{ x:20,y:20, Width:80,Height:30 },
    Value:'Button',
    activeScript:`
useBehavior('Button')
//my.Value = 'Label'
//onClick(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    function onClick (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onClick === 'function') { my._onClick(Event) }
    }

    my.Renderer = () => {
      const Label = acceptableTextline(my.Label || my.Value,'')

      return html`<button class="SNS Button" style="
        line-height:${my.LineHeight || my.Height}px;
      " disabled=${my.Enabling == false} onClick=${onClick}
      >${Label}</>`
    }
  },`
/**** Button ****/

  .SNS.Sticker > .SNS.Button {
    border:solid 1px black; border-radius:4px;
    background:white;
    font-weight:bold; color:black;
    text-align.center;
  }
  `)

/**** Checkbox ****/

  registerBehavior('native Controls', 'Checkbox', 'Checkbox', {
    Geometry:{ x:20,y:20, Width:20,Height:20 },
    Value:null,
    activeScript:`
useBehavior('Checkbox')
//my.Value = null/true/false
//onClick(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    function onClick (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = Event.target.checked
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onClick === 'function') { my._onClick(Event) }
    }

    my.Renderer = () => {
      const Value = acceptableOptionalBoolean(my.Value)

      const checked       = (Value == true)
      const indeterminate = (Value == null)

      return html`<input type="checkbox" class="SNS Checkbox"
        checked=${checked} indeterminate=${indeterminate}
        disabled=${my.Enabling == false} onClick=${onClick}
      />`
    }
  })

/**** Radiobutton ****/

  registerBehavior('native Controls', 'Radiobutton', 'Radiobutton', {
    Geometry:{ x:20,y:20, Width:20,Height:20 },
    Value:null,
    activeScript:`
useBehavior('Radiobutton')
//my.Value = true/false
//onClick(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    function onClick (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = Event.target.checked
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onClick === 'function') { my._onClick(Event) }
    }

    my.Renderer = () => {
      const Value = acceptableBoolean(my.Value,false)

      return html`<input type="radio" class="SNS Radiobutton"
        checked=${Value == true}
        disabled=${my.Enabling == false} onClick=${onClick}
      />`
    }
  })

/**** Gauge ****/

  registerBehavior('native Controls', 'Gauge', 'Gauge', {
    Geometry:{ x:20,y:20, Width:100,Height:20 },
    Value:0,
    activeScript:`
useBehavior('Gauge')
//my.Value      = 0
//my.Minimum    = 0
//my.lowerBound = 0
//my.Optimum    = undefined
//my.upperBound = 1
//my.Maximum    = 1
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = () => {
      const Value = acceptableNumber(
        ValueIsString(my.Value) ? parseFloat(my.Value as string) : my.Value, 0
      )
      const Minimum    = acceptableOptionalNumber(my.Minimum)
      const lowerBound = acceptableOptionalNumber(my.lowerBound)
      const Optimum    = acceptableOptionalNumber(my.Optimum)
      const upperBound = acceptableOptionalNumber(my.upperBound)
      const Maximum    = acceptableOptionalNumber(my.Maximum)

      return html`<meter class="SNS Gauge" value=${Value}
        min=${Minimum} low=${lowerBound} opt=${Optimum}
        high=${upperBound} max=${Maximum}
      />`
    }
  })

/**** Progressbar ****/

  registerBehavior('native Controls', 'Progressbar', 'Progressbar', {
    Geometry:{ x:20,y:20, Width:100,Height:10 },
    Value:0,
    activeScript:`
useBehavior('Progressbar')
//my.Value   = 0
//my.Maximum = 1
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = () => {
      const Value = acceptableNumber(
        ValueIsString(my.Value) ? parseFloat(my.Value as string) : my.Value, 0
      )
      const Maximum = acceptableOptionalNumber(my.Maximum)

      return html`<progress class="SNS Progressbar" value=${Value} max=${Maximum}
      style="accent-color:${my.ForegroundColor || 'dodgerblue'}"/>`
    }
  },`
/**** Progressbar ****/

  .SNS.Sticker > .SNS.Progressbar {
    -webkit-appearance:none; -moz-appearance:none; appearance:none;
    background-color:#EEEEEE;
  }
  .SNS.Sticker > .SNS.Progressbar::-webkit-progress-bar {
    background-color:#EEEEEE;
    border:solid 1px #E0E0E0; border-radius:2px;
  }
  .SNS.Sticker > .SNS.Progressbar::-webkit-progress-value,
  .SNS.Sticker > .SNS.Progressbar::-moz-progress-bar {
    background-color:dodgerblue;
    border:none; border-radius:2px;
  }
  `)

/**** Slider ****/

  const HashmarkPattern = /^\s*([+-]?(\d+([.]\d+)?|[.]\d+)([eE][+-]?\d+)?|\d*[.](?:\d*))(?:\s*:\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/

  registerBehavior('native Controls', 'Slider', 'Slider', {
    Geometry:{ x:20,y:20, Width:100,Height:20 },
    Value:null,
    activeScript:`
useBehavior('Slider')
//my.Value     = 0
//my.Minimum   = undefined
//my.Stepping  = undefined
//my.Maximum   = undefined
//my.Hashmarks = [0:'zero',1,2]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = 0

    function HashmarkMatcher (Value:any):boolean {
      return ValueIsStringMatching(Value,HashmarkPattern) || ValueIsNumber(Value)
    }

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = parseFloat(Event.target.value)
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let Value = acceptableNumber(
        ValueIsString(my.Value) ? parseFloat(my.Value as string) : my.Value, 0
      )
      const Minimum  = acceptableOptionalNumber(my.Minimum)
      const Stepping = acceptableOptionalNumberInRange(my.Stepping,undefined, 0)
      const Maximum  = acceptableOptionalNumber(my.Maximum)

      const Hashmarks = acceptableOptionalListSatisfying(
        my.Hashmarks, undefined, HashmarkMatcher
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let HashmarkList:any = '', HashmarkId
      if ((Hashmarks != null) && (Hashmarks.length > 0)) {
        HashmarkId = my.Id + '-Hashmarks'

        HashmarkList = html`\n<datalist id=${HashmarkId}>
          ${Hashmarks.map((Item:string|number) => {
            Item = ''+Item
            const Value = Item.replace(/:.*$/,'').trim()
            const Label = Item.replace(/^[^:]+:/,'').trim()

            return html`<option value=${Value}>${Label}</option>`
          })}
        </datalist>`
      }

      return html`<input type="range" class="SNS Slider"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${HashmarkId}
      />${HashmarkList}`
    }
  })

/**** Textline Input ****/

  registerBehavior('native Controls', 'Textline Input', 'TextlineInput', {
    Geometry:{ x:20,y:20, Width:100,Height:30 },
    Value:null,
    activeScript:`
useBehavior('TextlineInput')
//my.Value         = ''
//my.Placeholder   = undefined
//my.readonly      = false
//my.minLength     = 0
//my.maxLength     = undefined
//my.Pattern       = '.*'
//my.SpellChecking = undefined
//my.Suggestions   = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let   Value         = acceptableTextline(my.Value,'')
      const Placeholder   = acceptableOptionalTextline(my.Placeholder)
      const readonly      = acceptableOptionalBoolean(my.readonly)
      const minLength     = acceptableOptionalOrdinal(my.minLength)
      const maxLength     = acceptableOptionalOrdinal(my.maxLength)
      const Pattern       = acceptableOptionalTextline(my.Pattern)
      const SpellChecking = acceptableOptionalBoolean(my.SpellChecking)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, ValueIsTextline
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="text" class="SNS TextlineInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** TextlineInput ****/

  .SNS.Sticker > .SNS.TextlineInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.TextlineInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** Password Input ****/

  registerBehavior('native Controls', 'Password Input', 'PasswordInput', {
    Geometry:{ x:20,y:20, Width:100,Height:30 },
    Value:null,
    activeScript:`
useBehavior('PasswordInput')
//my.Value       = ''
//my.Placeholder = undefined
//my.readonly    = false
//my.minLength   = 0
//my.maxLength   = undefined
//my.Pattern     = '.*'
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let   Value       = acceptableTextline(my.Value,'')
      const Placeholder = acceptableOptionalTextline(my.Placeholder)
      const readonly    = acceptableOptionalBoolean(my.readonly)
      const minLength   = acceptableOptionalOrdinal(my.minLength)
      const maxLength   = acceptableOptionalOrdinal(my.maxLength)
      const Pattern     = acceptableOptionalTextline(my.Pattern)

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      return html`<input type="password" class="SNS PasswordInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
      />`
    }
  },`
/**** PasswordInput ****/

  .SNS.Sticker > .SNS.PasswordInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.PasswordInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** Number Input ****/

  registerBehavior('native Controls', 'Number Input', 'NumberInput', {
    Geometry:{ x:20,y:20, Width:100,Height:30 },
    Value:null,
    activeScript:`
useBehavior('NumberInput')
//my.Value       = 0
//my.Placeholder = undefined
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = [0,...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = 0

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = parseFloat(Event.target.value)
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let Value:number|undefined = acceptableNumber(
        ValueIsString(my.Value) ? parseFloat(my.Value as string) : my.Value, 0
      )
      const Placeholder = acceptableOptionalTextline(my.Placeholder)
      const readonly    = acceptableOptionalBoolean(my.readonly)
      const Minimum     = acceptableOptionalNumber(my.Minimum)
      const Stepping    = acceptableOptionalNumberInRange(my.Stepping,undefined, 0)
      const Maximum     = acceptableOptionalNumber(my.Maximum)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, ValueIsNumber
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:number) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="number" class="SNS NumberInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readOnly=${readonly} placeholder=${Placeholder}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** NumberInput ****/

  .SNS.Sticker > .SNS.NumberInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.NumberInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** Phone Number Input ****/

  registerBehavior('native Controls', 'Phone Number Input', 'PhoneNumberInput', {
    Geometry:{ x:20,y:20, Width:100,Height:30 },
    Value:null,
    activeScript:`
useBehavior('PhoneNumberInput')
//my.Value         = ''
//my.Placeholder   = undefined
//my.readonly      = false
//my.minLength     = 0
//my.maxLength     = undefined
//my.Pattern       = '.*'
//my.Suggestions = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let   Value       = acceptablePhoneNumber(my.Value,'')
      const Placeholder = acceptableOptionalTextline(my.Placeholder)
      const readonly    = acceptableOptionalBoolean(my.readonly)
      const minLength   = acceptableOptionalOrdinal(my.minLength)
      const maxLength   = acceptableOptionalOrdinal(my.maxLength)
      const Pattern     = acceptableOptionalTextline(my.Pattern)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, ValueIsPhoneNumber
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="tel" class="SNS PhoneNumberInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** PhoneNumberInput ****/

  .SNS.Sticker > .SNS.PhoneNumberInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.PhoneNumberInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** EMail Address Input ****/

  registerBehavior('native Controls', 'EMail Address Input', 'EMailAddressInput', {
    Geometry:{ x:20,y:20, Width:100,Height:30 },
    Value:null,
    activeScript:`
useBehavior('EMailAddressInput')
//my.Value       = ''
//my.Placeholder = undefined
//my.readonly    = false
//my.minLength   = 0
//my.maxLength   = undefined
//my.Pattern     = '.*'
//my.Suggestions = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let   Value       = acceptableTextline(my.Value,'') // not(!) acceptableEMailAddress
      const Placeholder = acceptableOptionalTextline(my.Placeholder)
      const readonly    = acceptableOptionalBoolean(my.readonly)
      const minLength   = acceptableOptionalOrdinal(my.minLength)
      const maxLength   = acceptableOptionalOrdinal(my.maxLength)
      const Pattern     = acceptableOptionalTextline(my.Pattern)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, ValueIsEMailAddress
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="email" class="SNS EMailAddressInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** EMailAddressInput ****/

  .SNS.Sticker > .SNS.EMailAddressInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.EMailAddressInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** URL Input ****/

  registerBehavior('native Controls', 'URL Input', 'URLInput', {
    Geometry:{ x:20,y:20, Width:100,Height:30 },
    Value:null,
    activeScript:`
useBehavior('URLInput')
//my.Value       = ''
//my.Placeholder = undefined
//my.readonly    = false
//my.minLength   = 0
//my.maxLength   = undefined
//my.Pattern     = '.*'
//my.Suggestions = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let   Value       = acceptableURL(my.Value,'')
      const Placeholder = acceptableOptionalTextline(my.Placeholder)
      const readonly    = acceptableOptionalBoolean(my.readonly)
      const minLength   = acceptableOptionalOrdinal(my.minLength)
      const maxLength   = acceptableOptionalOrdinal(my.maxLength)
      const Pattern     = acceptableOptionalTextline(my.Pattern)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, ValueIsURL
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="url" class="SNS URLInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** URLInput ****/

  .SNS.Sticker > .SNS.URLInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.URLInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** Time Input ****/

  const TimePattern = '\\d{2}:\\d{2}'
  const TimeRegExp  = /\d{2}:\d{2}/

  function TimeMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,TimeRegExp)
  }

  registerBehavior('native Controls', 'Time Input', 'TimeInput', {
    Geometry:{ x:20,y:20, Width:80,Height:30 },
    Value:null,
    activeScript:`
useBehavior('TimeInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let Value:string|undefined = acceptableOptionalStringMatching(
        my.Value, undefined, TimeRegExp
      )
      const readonly = acceptableOptionalBoolean(my.readonly)
      const Minimum  = acceptableOptionalStringMatching(my.Minimum, undefined, TimeRegExp)
      const Stepping = acceptableOptionalNumberInRange(my.Stepping,undefined, 0)
      const Maximum  = acceptableOptionalStringMatching(my.Maximum, undefined, TimeRegExp)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, TimeMatcher
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="time" class="SNS TimeInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readOnly=${readonly} pattern=${TimePattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** TimeInput ****/

  .SNS.Sticker > .SNS.TimeInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.TimeInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** Date and Time Input ****/

  const DateTimePattern = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}'
  const DateTimeRegExp  = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/

  function DateTimeMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,DateTimeRegExp)
  }
  registerBehavior('native Controls', 'Date and Time Input', 'DateTimeInput', {
    Geometry:{ x:20,y:20, Width:180,Height:30 },
    Value:null,
    activeScript:`
useBehavior('DateTimeInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let Value:string|undefined = acceptableOptionalStringMatching(
        my.Value, undefined, DateTimeRegExp
      )
      const readonly = acceptableOptionalBoolean(my.readonly)
      const Minimum  = acceptableOptionalStringMatching(my.Minimum, undefined, DateTimeRegExp)
      const Stepping = acceptableOptionalNumberInRange(my.Stepping,undefined, 0)
      const Maximum  = acceptableOptionalStringMatching(my.Maximum, undefined, DateTimeRegExp)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, DateTimeMatcher
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="datetime-local" class="SNS DateTimeInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readOnly=${readonly} pattern=${DateTimePattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** DateTimeInput ****/

  .SNS.Sticker > .SNS.DateTimeInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.DateTimeInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** Date Input ****/

  const DatePattern = '\\d{4}-\\d{2}-\\d{2}'
  const DateRegExp  = /\d{4}-\d{2}-\d{2}/

  function DateMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,DateRegExp)
  }

  registerBehavior('native Controls', 'Date Input', 'DateInput', {
    Geometry:{ x:20,y:20, Width:120,Height:30 },
    Value:null,
    activeScript:`
useBehavior('DateInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let Value:string|undefined = acceptableOptionalStringMatching(
        my.Value, undefined, DateRegExp
      )
      const readonly = acceptableOptionalBoolean(my.readonly)
      const Minimum  = acceptableOptionalStringMatching(my.Minimum, undefined, DateRegExp)
      const Stepping = acceptableOptionalNumberInRange(my.Stepping,undefined, 0)
      const Maximum  = acceptableOptionalStringMatching(my.Maximum, undefined, DateRegExp)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, DateMatcher
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="date" class="SNS DateInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readOnly=${readonly} pattern=${DatePattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** DateInput ****/

  .SNS.Sticker > .SNS.DateInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.DateInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** Week Input ****/

  const WeekPattern = '\\d{4}-W\\d{2}'
  const WeekRegExp  = /\d{4}-W\d{2}/

  function WeekMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WeekRegExp)
  }

  registerBehavior('native Controls', 'Week Input', 'WeekInput', {
    Geometry:{ x:20,y:20, Width:150,Height:30 },
    Value:null,
    activeScript:`
useBehavior('WeekInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let Value:string|undefined = acceptableOptionalStringMatching(
        my.Value, undefined, WeekRegExp
      )
      const readonly = acceptableOptionalBoolean(my.readonly)
      const Minimum  = acceptableOptionalStringMatching(my.Minimum, undefined, WeekRegExp)
      const Stepping = acceptableOptionalNumberInRange(my.Stepping,undefined, 0)
      const Maximum  = acceptableOptionalStringMatching(my.Maximum, undefined, WeekRegExp)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, WeekMatcher
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="week" class="SNS WeekInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readOnly=${readonly} pattern=${WeekPattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** WeekInput ****/

  .SNS.Sticker > .SNS.WeekInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.WeekInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** Month Input ****/

  const MonthPattern = '\\d{4}-\\d{2}'
  const MonthRegExp  = /\d{4}-\d{2}/

  function MonthMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,MonthRegExp)
  }

  registerBehavior('native Controls', 'Month Input', 'MonthInput', {
    Geometry:{ x:20,y:20, Width:150,Height:30 },
    Value:null,
    activeScript:`
useBehavior('MonthInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let Value:string|undefined = acceptableOptionalStringMatching(
        my.Value, undefined, MonthRegExp
      )
      const readonly = acceptableOptionalBoolean(my.readonly)
      const Minimum  = acceptableOptionalStringMatching(my.Minimum, undefined, MonthRegExp)
      const Stepping = acceptableOptionalNumberInRange(my.Stepping,undefined, 0)
      const Maximum  = acceptableOptionalStringMatching(my.Maximum, undefined, MonthRegExp)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, MonthMatcher
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="month" class="SNS MonthInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readOnly=${readonly} pattern=${MonthPattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** MonthInput ****/

  .SNS.Sticker > .SNS.MonthInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.MonthInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** File Input ****/

  registerBehavior('native Controls', 'File Input', 'FileInput', {
    Geometry:{ x:20,y:20, Width:100,Height:30 },
    Value:null,
    activeScript:`
useBehavior('FileInput')
//my.Value           = ''
//my.Placeholder     = undefined
//my.acceptableTypes = undefined
//my.multiple        = false
//onInput(() => ...)
//onDrop(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = Array.from(Event.target.files).map((File:any) => File.name).join('\n')
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event,Event.target.files) }
    }

    function onDragEnter (Event:Event):void { return consumingEvent(Event) }
    function onDragOver  (Event:Event):void { return consumingEvent(Event) }

    function onDrop (Event:any):void {
      consumeEvent(Event)
      if (my.Enabling == false) { return }

      my.Value = Array.from(Event.dataTransfer.files).map((File:any) => File.name).join('\n')
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onDrop === 'function') { my._onDrop(Event,Event.dataTransfer.files) }
    }                 // nota bene: "files" is now in "Event.dataTransfer.files"

    my.Renderer = () => {
      const Value           = acceptableText(my.Value,'').trim().replace(/[\n\r]+/g,',')
      const Placeholder     = acceptableTextline(my.Placeholder,'').trim()
      const acceptableTypes = acceptableOptionalTextline(my.acceptableTypes,'*')
      const multiple        = acceptableOptionalBoolean(my.multiple)

      return html`<label class="SNS FileInput"
        onDragEnter=${onDragEnter} onDragOver=${onDragOver} onDrop=${onDrop}
      >
        ${Value === ''
          ? Placeholder === '' ? '' : html`<span style="
              font-size:${Math.round((my.FontSize || 14)*0.95)}px; line-height:${my.Height}px
            ">${Placeholder}</span>`
          : html`<span style="line-height:${my.Height}px">${Value}</span>`
        }
        <input type="file" style="display:none"
          multiple=${multiple} accept=${acceptableTypes}
          onInput=${onInput}
        />
      </label>`
    }
  },`
/**** FileInput ****/

  .SNS.Sticker > .SNS.FileInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  .SNS.Sticker > .SNS.FileInput > span {
    display:block; position:absolute; overflow:hidden;
    left:0px; top:0px; width:100%; height:100%;
    color:gray;
    padding:0px 2px 0px 2px; white-space:pre; text-overflow:ellipsis;
  }
  `)

/**** Pseudo File Input ****/

  registerBehavior('native Controls', 'Pseudo File Input', 'PseudoFileInput', {
    Geometry:{ x:20,y:20, Width:24,Height:24 },
    Value:null,
    activeScript:`
useBehavior('PseudoFileInput')
//my.Value           = ''
//my.Icon            = 'icon image url'
//my.acceptableTypes = undefined
//my.multiple        = false
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = Array.from(Event.target.files).map((File:any) => File.name).join('\n')
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event,Event.target.files) }
    }

    my.Renderer = () => {
      const Icon            = acceptableURL(my.Icon,'./icons/arrow-up-from-bracket.png')
      const Color           = acceptableColor(my.Color,'black')
      const acceptableTypes = acceptableOptionalTextline(my.acceptableTypes,'*')
      const multiple        = acceptableOptionalBoolean(my.multiple)

      return html`<label class="SNS PseudoFileInput">
        <div style="
          -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
          background-color:${Color};
        "></div>
        <input type="file" style="display:none"
          multiple=${multiple} accept=${acceptableTypes}
          onInput=${onInput}
        />
      </label>`
    }
  },`
/**** PseudoFileInput ****/

  .SNS.Sticker > .SNS.PseudoFileInput > div {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  `)

/**** File Drop Area ****/

  registerBehavior('native Controls', 'File Drop Area', 'FileDropArea', {
    Geometry:{ x:20,y:20, Width:100,Height:80 },
    Value:null,
    activeScript:`
useBehavior('FileDropArea')
//my.Value           = ['']
//my.Placeholder     = undefined
//my.acceptableTypes = undefined
//my.multiple        = false
//onInput(() => ...)
//onDrop(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = Array.from(Event.target.files).map((File:any) => File.name).join('\n')
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event,Event.target.files) }
    }

    function onDragEnter (Event:Event):void { return consumingEvent(Event) }
    function onDragOver  (Event:Event):void { return consumingEvent(Event) }

    function onDrop (Event:any):void {
      consumeEvent(Event)
      if (my.Enabling == false) { return }

      my.Value = Array.from(Event.dataTransfer.files).map((File:any) => File.name).join('\n')
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onDrop === 'function') { my._onDrop(Event,Event.dataTransfer.files) }
    }                 // nota bene: "files" is now in "Event.dataTransfer.files"

    my.Renderer = () => {
      const Placeholder     = acceptableTextline(my.Placeholder,'').trim()
      const acceptableTypes = acceptableOptionalTextline(my.acceptableTypes,'*')
      const multiple        = acceptableOptionalBoolean(my.multiple)

      return html`<label class="SNS FileDropArea"
        onDragEnter=${onDragEnter} onDragOver=${onDragOver} onDrop=${onDrop}>
        <span>${Placeholder}</span>
        <input type="file"
          multiple=${multiple} accept=${acceptableTypes}
          onInput=${onInput}
        />
      </label>`
    }
  },`
/**** FileDropArea ****/

  .SNS.Sticker > .SNS.FileDropArea {
    display:flex; flex-flow:column nowrap;
      justify-content:center; align-items:center;
    border:dashed 4px #DDDDDD; border-radius:4px;
    color:#DDDDDD; background:white;
  }

  .SNS.Sticker > .SNS.FileDropArea * { pointer-events:none }

  .SNS.Sticker > .SNS.FileDropArea > input[type="file"] {
    display:block; position:absolute; appearance:none;
    left:0px; top:0px; right:0px; bottom:0px;
    opacity:0.01;
  }
  `)

/**** Search Input ****/

  registerBehavior('native Controls', 'Search Input', 'SearchInput', {
    Geometry:{ x:20,y:20, Width:100,Height:30 },
    Value:null,
    activeScript:`
useBehavior('SearchInput')
//my.Value         = ''
//my.Placeholder   = undefined
//my.readonly      = false
//my.minLength     = 0
//my.maxLength     = undefined
//my.Pattern       = '.*'
//my.SpellChecking = undefined
//my.Suggestions   = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let   Value         = acceptableTextline(my.Value,'')
      const Placeholder   = acceptableOptionalTextline(my.Placeholder)
      const readonly      = acceptableOptionalBoolean(my.readonly)
      const minLength     = acceptableOptionalOrdinal(my.minLength)
      const maxLength     = acceptableOptionalOrdinal(my.maxLength)
      const Pattern       = acceptableOptionalTextline(my.Pattern)
      const SpellChecking = acceptableOptionalBoolean(my.SpellChecking)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, ValueIsTextline
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="search" class="SNS SearchInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** SearchInput ****/

  .SNS.Sticker > .SNS.SearchInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.SearchInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** Color Input ****/

  registerBehavior('native Controls', 'Color Input', 'ColorInput', {
    Geometry:{ x:20,y:20, Width:40,Height:30 },
    Value:null,
    activeScript:`
useBehavior('ColorInput')
//my.Value       = ''
//my.Suggestions = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let Value = acceptableOptionalColor(my.Value)

      const Suggestions = acceptableOptionalListSatisfying(
        my.Suggestions, undefined, ValueIsColor
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = my.Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<input type="color" class="SNS ColorInput"
        value=${Value}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  },`
/**** ColorInput ****/

  .SNS.Sticker > .SNS.ColorInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  `)

/**** DropDown ****/

  registerBehavior('native Controls', 'DropDown', 'DropDown', {
    Geometry:{ x:20,y:20, Width:100,Height:30 },
    Value:null,
    activeScript:`
useBehavior('DropDown')
//my.Value   = '...'
//my.Options = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let Value = acceptableTextline(my.Value,'')

      const Options = acceptableListSatisfying(
        my.Options, [], ValueIsTextline
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      return html`<select class="SNS DropDown"
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
      >${Options.map((Option:string) => {
          const OptionValue = Option.replace(/:.*$/,'').trim()
          let   OptionLabel = Option.replace(/^[^:]+:/,'').trim()
          const disabled    = (OptionLabel[0] === '-')
            if (/^-[^-]+$/.test(OptionLabel)) {
              OptionLabel = OptionLabel.slice(1)
            }
          return html`<option value=${OptionValue} selected=${OptionValue === Value}
            disabled=${disabled}
          >
            ${OptionLabel}
          </option>`
        }
      )}</select>`
    }
  },`
/**** DropDown ****/

  .SNS.Sticker > .SNS.DropDown {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  `)

/**** Pseudo DropDown ****/

  registerBehavior('native Controls', 'Pseudo DropDown', 'PseudoDropDown', {
    Geometry:{ x:20,y:20, Width:24,Height:24 },
    Value:null,
    activeScript:`
useBehavior('PseudoDropDown')
//my.Value   = '...'
//my.Icon    = 'icon image url'
//my.Options = ['...',...]
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let   Value = acceptableTextline(my.Value,'')
      const Icon  = acceptableURL(my.Icon,'./icons/menu.png')
      const Color = acceptableColor(my.Color,'black')

      const Options = acceptableListSatisfying(
        my.Options, [], ValueIsTextline
      )

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      return html`<div class="SNS PseudoDropDown">
        <div style="
          -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
          background-color:${Color};
        "></div>
        <select disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}>
          ${Options.map((Option:string) => {
            const OptionValue = Option.replace(/:.*\$/,'').trim()
            let   OptionLabel = Option.replace(/^[^:]+:/,'').trim()
            const disabled    = (OptionLabel[0] === '-')
              if (/^-[^-]+$/.test(OptionLabel)) {
                OptionLabel = OptionLabel.slice(1)
              }
            return html`<option value=${OptionValue} selected=${OptionValue === Value}
              disabled=${disabled}
            >
              ${OptionLabel}
            </option>`
          })}
        </select>
      </div>`
    }
  },`
/**** PseudoDropDown ****/

  .SNS.Sticker > .SNS.PseudoDropDown > div {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }

  .SNS.Sticker > .SNS.PseudoDropDown > select {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    opacity:0.01;
  }
  `)

/**** Text Input ****/

  registerBehavior('native Controls', 'Text Input', 'TextInput', {
    Geometry:{ x:20,y:20, Width:100,Height:30 },
    Value:null,
    activeScript:`
useBehavior('TextInput')
//my.Value         = ''
//my.Placeholder   = undefined
//my.readonly      = false
//my.minLength     = 0
//my.maxLength     = undefined
//my.LineWrapping  = false
//my.SpellChecking = undefined
//onInput(() => ...)
`,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.ValueToShow = ''

    function onInput (Event:any):void {
      if (my.Enabling == false) { return consumingEvent(Event) }

      my.Value = my.ValueToShow = Event.target.value
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
      if (typeof my._onInput === 'function') { my._onInput(Event) }
    }

    function onBlur () { me.rerender() }

    my.Renderer = () => {
      let   Value         = acceptableText(my.Value,'')
      const Placeholder   = acceptableOptionalTextline(my.Placeholder)
      const readonly      = acceptableOptionalBoolean(my.readonly)
      const minLength     = acceptableOptionalOrdinal(my.minLength)
      const maxLength     = acceptableOptionalOrdinal(my.maxLength)
      const LineWrapping  = acceptableOptionalBoolean(my.LineWrapping)
      const SpellChecking = acceptableOptionalBoolean(my.SpellChecking)

      if (document.activeElement === my.View) {
        Value = my.ValueToShow
      } else {
        my.ValueToShow = Value
      }

      return html`<textarea class="SNS TextInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        spellcheck=${SpellChecking} style="resize:none; ${
          LineWrapping == true
          ? 'white-space:pre; overflow-wrap:break-word; hyphens:auto'
          : undefined
        }"
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        value=${Value}
      />`
    }
  },`
/**** TextInput ****/

  .SNS.Sticker > .SNS.TextInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.TextInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `)

/**** Line ****/

  registerBehavior('basic Shapes', 'Line', 'Line')

/**** Polyline ****/

  registerBehavior('basic Shapes', 'Polyline', 'Polyline')

/**** Arc ****/

  registerBehavior('basic Shapes', 'Arc', 'Arc')

/**** quadratic Bezier ****/

  registerBehavior('basic Shapes', 'quadratic Bezier', 'quadraticBezier')

/**** cubic Bezier ****/

  registerBehavior('basic Shapes', 'cubic Bezier', 'cubicBezier')

/**** Box ****/

  registerBehavior('basic Shapes', 'Box', 'Box')

/**** rounded Box ****/

  registerBehavior('basic Shapes', 'rounded Box', 'roundedBox')

/**** Oval ****/

  registerBehavior('basic Shapes', 'Oval', 'Oval')

/**** Chord ****/

  registerBehavior('basic Shapes', 'Chord', 'Chord')

/**** Pie ****/

  registerBehavior('basic Shapes', 'Pie', 'Pie')

/**** Polygon ****/

  registerBehavior('basic Shapes', 'Polygon', 'Polygon')

/**** regular Polygon ****/

  registerBehavior('basic Shapes', 'regular Polygon', 'regularPolygon')

/**** straightArrow_nw ****/

  registerBehavior('straight Arrows', 'nw', 'straightArrow_nw', {
    Geometry:{ x:20,y:20, Width:40,Height:40 },
    minWidth:12, minHeight:12,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}"
            d="M ${Width-6},${Height-6}, L 6,6"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `)

/**** straightArrow_n ****/

  registerBehavior('straight Arrows', 'n', 'straightArrow_n', {
    Geometry:{ x:20,y:20, Width:40,Height:40 },
    minWidth:12, minHeight:12,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}"
            d="M ${Width/2},${Height}, L ${Width/2},0"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `)

/**** straightArrow_ne ****/

  registerBehavior('straight Arrows', 'ne', 'straightArrow_ne', {
    Geometry:{ x:20,y:20, Width:40,Height:40 },
    minWidth:12, minHeight:12,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}"
            d="M 6,${Height-6}, L ${Width-6},6"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `)

/**** straightArrow_e ****/

  registerBehavior('straight Arrows', 'e', 'straightArrow_e', {
    Geometry:{ x:20,y:20, Width:40,Height:40 },
    minWidth:12, minHeight:12,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}"
            d="M 0,${Height/2}, L ${Width},${Height/2}"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `)

/**** straightArrow_se ****/

  registerBehavior('straight Arrows', 'se', 'straightArrow_se', {
    Geometry:{ x:20,y:20, Width:40,Height:40 },
    minWidth:12, minHeight:12,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}"
            d="M 6,6, L ${Width-6},${Height-6}"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `)

/**** straightArrow_s ****/

  registerBehavior('straight Arrows', 's', 'straightArrow_s', {
    Geometry:{ x:20,y:20, Width:40,Height:40 },
    minWidth:12, minHeight:12,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}"
            d="M ${Width/2},0, L ${Width/2},${Height}"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `)

/**** straightArrow_sw ****/

  registerBehavior('straight Arrows', 'sw', 'straightArrow_sw', {
    Geometry:{ x:20,y:20, Width:40,Height:40 },
    minWidth:12, minHeight:12,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}"
            d="M ${Width-6},6, L 6,${Height-6}"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `)

/**** straightArrow_w ****/

  registerBehavior('straight Arrows', 'w', 'straightArrow_w', {
    Geometry:{ x:20,y:20, Width:40,Height:40 },
    minWidth:12, minHeight:12,
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}"
            d="M ${Width},${Height/2}, L 0,${Height/2}"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `)

/**** curvedArrow cw n ****/

  registerBehavior('curved Arrows', 'cw n', 'curvedArrow_cw_n', {
    Geometry:{ x:20,y:20, Width:50,Height:60 },
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}" fill="none"
            d="M ${Width},${Height-6}, A ${Width-6} ${Height-18} 0 0 1 6 12"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `)

/**** curvedArrow cw e ****/

  registerBehavior('curved Arrows', 'cw e', 'curvedArrow_cw_e', {
    Geometry:{ x:20,y:20, Width:60,Height:50 },
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}" fill="none"
            d="M 6,${Height}, A ${Width-18} ${Height-6} 0 0 1 ${Width-12} 6"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `)

/**** curvedArrow cw s ****/

  registerBehavior('curved Arrows', 'cw s', 'curvedArrow_cw_s', {
    Geometry:{ x:20,y:20, Width:50,Height:60 },
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}" fill="none"
            d="M 0,6, A ${Width-6} ${Height-18} 0 0 1 ${Width-6} ${Height-12}"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `)

/**** curvedArrow cw w ****/

  registerBehavior('curved Arrows', 'cw w', 'curvedArrow_cw_w', {
    Geometry:{ x:20,y:20, Width:60,Height:50 },
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}" fill="none"
            d="M ${Width-6},0, A ${Width-18} ${Height-6} 0 0 1 12 ${Height-6}"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `)

/**** curvedArrow ccw n ****/

  registerBehavior('curved Arrows', 'ccw n', 'curvedArrow_ccw_n', {
    Geometry:{ x:20,y:20, Width:50,Height:60 },
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}" fill="none"
            d="M 0,${Height-6}, A ${Width-6} ${Height-18} 0 0 0 ${Width-6} 12"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `)

/**** curvedArrow ccw e ****/

  registerBehavior('curved Arrows', 'ccw e', 'curvedArrow_ccw_e', {
    Geometry:{ x:20,y:20, Width:60,Height:50 },
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}" fill="none"
            d="M 6,0, A ${Width-18} ${Height-6} 0 0 0 ${Width-12} ${Height-6}"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `)

/**** curvedArrow ccw s ****/

  registerBehavior('curved Arrows', 'ccw s', 'curvedArrow_ccw_s', {
    Geometry:{ x:20,y:20, Width:50,Height:60 },
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}" fill="none"
            d="M ${Width},6, A ${Width-6} ${Height-18} 0 0 0 6 ${Height-12}"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `)

/**** curvedArrow ccw w ****/

  registerBehavior('curved Arrows', 'ccw w', 'curvedArrow_ccw_w', {
    Geometry:{ x:20,y:20, Width:60,Height:50 },
  }, (
    me:SNS_Sticker, my:SNS_Sticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    my.Renderer = function () {
      const { Width,Height } = my.Geometry
      const Color = my.ForegroundColor || 'black'

      const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path marker-end="url(#arrow-head)" stroke-width="3" stroke="${Color}" fill="none"
            d="M ${Width-6},${Height}, A ${Width-18} ${Height-8} 0 0 0 12 6"
          />
        </svg>
      `
      const DataURL = 'data:image/svg+xml;base64,' + btoa(SVGSource)
      return html`<img class="SNS straightArrow" src=${DataURL}/>`
    }
  },`
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `)

/**** horizontal Ruler ****/

  registerBehavior('other Controls', 'horizontal Ruler', 'horizontalRuler', {
    Geometry:{ x:20,y:20, Width:120,Height:40 },
    activeScript:`
useBehavior('horizontalRuler')
//my.Placement = 'above'|'below'
    `,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    let Canvas = my.unobserved.Canvas = document.createElement('canvas')

    onRender(() => {
      const Placement = my.Placement

      if (my.View == null) {
        me.rerender()
      } else {
        my.View.innerHTML = ''
        my.View.appendChild(Canvas)
      }

      const { Width,Height } = me

      Canvas.width  = Width
      Canvas.height = Height

      function drawLine (x0:number,y0:number, x1:number,y1:number, Text?:any):void {
        Context.beginPath()
          Context.moveTo(x0,y0)
          Context.lineTo(x1,y1)
        Context.stroke()

        if (Text != null) {
          if (Placement === 'above') {
            Context.fillText(Text, x0,y1-5)
          } else {
            Context.fillText(Text, x0,y1+5)
          }
        }
      }

      const Context = Canvas.getContext('2d') as CanvasRenderingContext2D
        Context.clearRect(0,0, Width,Height)

        Context.strokeStyle = my.Color || 'black'
        Context.lineWidth   = 1

        if (Placement === 'above') {
          Context.textAlign    = 'center'
          Context.textBaseline = 'bottom'

          drawLine(0,Height, Width,Height)
          for (let x = 0; x <= Width; x += 10) {
            switch (true) {
              case (x % 100 === 0): drawLine(x,Height, x,Height-15, x); break
              case (x % 50  === 0): drawLine(x,Height, x,Height-10); break
              default:              drawLine(x,Height, x,Height-7)
            }
          }
        } else {
          Context.textAlign    = 'center'
          Context.textBaseline = 'top'

          drawLine(0,0, Width,0)
          for (let x = 0; x <= Width; x += 10) {
            switch (true) {
              case (x % 100 === 0): drawLine(x,0, x,15, x); break
              case (x % 50  === 0): drawLine(x,0, x,10); break
              default:              drawLine(x,0, x,7)
            }
          }
        }
      return ''
    })
  },`
/**** horizontalRuler ****/

  .SNS.horizontalRuler > canvas {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
  }
  `)

/**** vertical Ruler ****/

  registerBehavior('other Controls', 'vertical Ruler', 'verticalRuler', {
    Geometry:{ x:20,y:20, Width:40,Height:120 },
    activeScript:`
useBehavior('verticalRuler')
//my.Placement = 'left'|'right'
    `,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    let Canvas = my.unobserved.Canvas = document.createElement('canvas')

    onRender(() => {
      const Placement = my.Placement

      if (my.View == null) {
        me.rerender()
      } else {
        my.View.innerHTML = ''
        my.View.appendChild(Canvas)
      }

      const { Width,Height } = me

      Canvas.width  = Width
      Canvas.height = Height

      function drawLine (x0:number,y0:number, x1:number,y1:number, Text?:any):void {
        Context.beginPath()
          Context.moveTo(x0,y0)
          Context.lineTo(x1,y1)
        Context.stroke()

        if (Text != null) {
          if (Placement === 'left') {
            Context.fillText(Text, x1-5,y1)
          } else {
            Context.fillText(Text, x1+5,y1)
          }
        }
      }

      const Context = Canvas.getContext('2d') as CanvasRenderingContext2D
        Context.clearRect(0,0, Width,Height)

        Context.strokeStyle = my.Color || 'black'
        Context.lineWidth   = 1

        if (Placement === 'left') {
          Context.textAlign    = 'right'
          Context.textBaseline = 'middle'

          drawLine(Width,0, Width,Height)
          for (let y = 0; y <= Height; y += 10) {
            switch (true) {
              case (y % 100 === 0): drawLine(Width,y, Width-15,y, y); break
              case (y % 50  === 0): drawLine(Width,y, Width-10,y); break
              default:              drawLine(Width,y, Width-7,y)
            }
          }
        } else {
          Context.textAlign    = 'left'
          Context.textBaseline = 'middle'

          drawLine(0,0, 0,Height)
          for (let y = 0; y <= Height; y += 10) {
            switch (true) {
              case (y % 100 === 0): drawLine(0,y, 15,y, y); break
              case (y % 50  === 0): drawLine(0,y, 10,y); break
              default:              drawLine(0,y, 7,y)
            }
          }
        }
      return ''
    })
  },`
/**** verticalRuler ****/

  .SNS.verticalRuler > canvas {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
  }
  `)

/**** flat List View ****/

  registerBehavior('other Controls', 'flat List View', 'FlatListView')

/**** nested List View ****/

  registerBehavior('other Controls', 'nested List View', 'NestedListView')

/**** QR-Code View ****/

  registerBehavior('other Controls', 'QR-Code View', 'QRCodeView', {
    Geometry:{ x:20,y:20, Width:120,Height:120 },
    activeScript:`
useBehavior('QRCodeView')
//my.Value           = '...'
//my.ForegroundColor = 'black'
//my.BackgroundColor = 'white'
//my.CorrectionLevel = 'low'|'medium'|'quartile'|'high'
    `,
  }, (
    me:IndexableSticker, my:IndexableSticker, html:Function, reactively:Function,
    onRender:Function, onMount:Function, onUnmount:Function
  ):void => {
    onMount(() => me.rerender())

    const CorrectionLevelSet:Indexable = {
      low:     (QRCode as Indexable).CorrectLevel.L,
      medium:  (QRCode as Indexable).CorrectLevel.M,
      quartile:(QRCode as Indexable).CorrectLevel.Q,
      high:    (QRCode as Indexable).CorrectLevel.H
    }

    onRender(() => {
      if (my.View != null) {
        my.View.innerHTML = ''

        const CorrectionLevel = (
// @ts-ignore TS7053 allow indexing of "CorrectionLevelSet"
          CorrectionLevelSet[''+my.CorrectionLevel] || QRCode.CorrectLevel.L
        )
        const Value = String(my.Value || 'https://github.com/rozek/shareable-note-stickers')
        const Size  = Math.min(my.Width,my.Height)

// @ts-ignore TS2351 allow construction of "QRCode"
        new QRCode(my.View,{
          text:Value,
          width:Size, height:Size,
          colorDark: my.ForegroundColor || 'black',
          colorLight:my.BackgroundColor || 'white',
          correctLevel:CorrectionLevel
        })
      }
      return ''
    })
  })

/**** CSSStyleOfVisual ****/

  export function CSSStyleOfVisual (Visual:SNS_Visual):string {
    expectVisual('visual',Visual)

    let CSSStyleList:string[] = []
      const {
        BackgroundColor, BackgroundTexture, ForegroundColor,
        FontFamily, FontSize, FontWeight, FontStyle, LineHeight
      } = Visual

      if (BackgroundColor != null) { CSSStyleList.push(`background-color:${BackgroundColor}`) }
      if (BackgroundTexture != null) {
        CSSStyleList.push(
          `background-image:${BackgroundTexture}; background-repeat:repeat`
        )
      }
      if (ForegroundColor != null) { CSSStyleList.push(`color:${ForegroundColor}`) }

      if (FontFamily != null) { CSSStyleList.push(`font-family:${FontFamily}`) }
      if (FontSize   != null) { CSSStyleList.push(`font-size:${FontSize}px`) }
      if (FontWeight != null) { CSSStyleList.push(`font-weight:${FontWeight}`) }
      if (FontStyle  != null) { CSSStyleList.push(`font-style:${FontStyle}`) }
      if (LineHeight != null) { CSSStyleList.push(`line-height:${LineHeight}px`) }
    return CSSStyleList.join(';')
  }

/**** consume/consumingEvent ****/

  function consumeEvent (Event:Event):void {
    Event.stopPropagation()
    Event.preventDefault()
  }
  const consumingEvent = consumeEvent

/**** propagateEvent ****/

  function propagateEvent (Event:Event):void { /* nop - just a dummy */ }

//------------------------------------------------------------------------------
//--                                SNS_Visual                                --
//------------------------------------------------------------------------------

  export class SNS_Visual {
    protected constructor (Project:SNS_Project, Id:SNS_Id|undefined) {
      this._Project = Project
      this._Id = Id || newId()
    }   // IMPORTANT: SNS_Project constructor will pass "undefined" as "Project"

  /**** Id - for internal use only ****/

    private _Id:SNS_Id

    public get Id ():SNS_Id  { return this._Id }
    public set Id (_:SNS_Id) { throwReadOnlyError('Id') }

  /**** Name ****/

    protected _Name:SNS_Name|undefined

    public get Name ():SNS_Name|undefined { return this._Name }
    public set Name (newName:SNS_Name|undefined) {
      allowName('visual name',newName)
      if (newName != null) {
        newName = newName.trim()
        if (newName === '') { newName = undefined }
      }

      if (this._Name !== newName) {
        this._Name = newName
        this._reportChange('configure',this,'Name',newName)
        this.rerender()
      }
    }

  /**** Project ****/

    protected _Project:SNS_Project

    public get Project ():SNS_Project  { return this._Project }
    public set Project (_:SNS_Project) { throwReadOnlyError('Project') }

  /**** Folder ****/

    protected _Folder:SNS_Folder|undefined

    public get Folder ():SNS_Folder|undefined  { return this._Folder }
    public set Folder (_:SNS_Folder|undefined) { throwReadOnlyError('Folder') }

  /**** isAttached ****/

    public get isAttached ():boolean  {
      return (this._Folder == null ? ValueIsProject(this) : this._Folder.isAttached )
    }
    public set isAttached (_:boolean) { throwReadOnlyError('isAttached') }

  /**** BackgroundColor ****/

    protected _BackgroundColor:SNS_Color|undefined

    public get BackgroundColor ():SNS_Color|undefined {
      return (
        this._BackgroundColor == null
        ? this._Folder == null ? undefined : this._Folder.BackgroundColor
        : this._BackgroundColor
      )
    }

    public set BackgroundColor (newColor:SNS_Color|undefined) {
      allowColor('visual background color',newColor)
      if (this._BackgroundColor !== newColor) {
        this._BackgroundColor = newColor

        this._reportChange('configure',this,'BackgroundColor',newColor)
        this.rerender()
      }
    }

  /**** BackgroundTexture ****/

    protected _BackgroundTexture:SNS_URL|undefined

    public get BackgroundTexture ():SNS_URL|undefined {
      return (
        this._BackgroundTexture == null
        ? this._Folder == null ? undefined : this._Folder.BackgroundTexture
        : this._BackgroundTexture
      )
    }

    public set BackgroundTexture (newTexture:SNS_URL|undefined) {
      allowURL('visual background texture',newTexture)
      if (this._BackgroundTexture !== newTexture) {
        this._BackgroundTexture = newTexture

        this._reportChange('configure',this,'BackgroundTexture',newTexture)
        this.rerender()
      }
    }

  /**** FontFamily ****/

    protected _FontFamily:SNS_Textline|undefined

    public get FontFamily ():SNS_Textline|undefined {
      return (
        this._FontFamily == null
        ? this._Folder == null ? undefined : this._Folder.FontFamily
        : this._FontFamily
      )
    }

    public set FontFamily (newFontFamily:SNS_Textline|undefined) {
      allowTextline('visual font family',newFontFamily)
      if (this._FontFamily !== newFontFamily) {
        this._FontFamily = newFontFamily

        this._reportChange('configure',this,'FontFamily',newFontFamily)
        this.rerender()
      }
    }

  /**** FontSize ****/

    protected _FontSize:SNS_Ordinal|undefined

    public get FontSize ():SNS_Ordinal|undefined {
      return (
        this._FontSize == null
        ? this._Folder == null ? undefined : this._Folder.FontSize
        : this._FontSize
      )
    }

    public set FontSize (newFontSize:SNS_Ordinal|undefined) {
      allowOrdinal('visual font size',newFontSize)
      if (this._FontSize !== newFontSize) {
        this._FontSize = newFontSize

        this._reportChange('configure',this,'FontSize',newFontSize)
        this.rerender()
      }
    }

  /**** FontWeight ****/

    protected _FontWeight:SNS_Ordinal|undefined

    public get FontWeight ():SNS_Ordinal|undefined {
      return (
        this._FontWeight == null
        ? this._Folder == null ? undefined : this._Folder.FontWeight
        : this._FontWeight
      )
    }

    public set FontWeight (newFontWeight:SNS_Ordinal|undefined) {
      allowIntegerInRange('visual font weight',newFontWeight, 1,1000)
      if (this._FontWeight !== newFontWeight) {
        this._FontWeight = newFontWeight

        this._reportChange('configure',this,'FontWeight',newFontWeight)
        this.rerender()
      }
    }

  /**** FontStyle ****/

    protected _FontStyle:SNS_FontStyle|undefined

    public get FontStyle ():SNS_FontStyle|undefined {
      return (
        this._FontStyle == null
        ? this._Folder == null ? undefined : this._Folder.FontStyle
        : this._FontStyle
      )
    }

    public set FontStyle (newFontStyle:SNS_FontStyle|undefined) {
      allowOneOf('visual font style',newFontStyle, SNS_FontStyles)
      if (this._FontStyle !== newFontStyle) {
        this._FontStyle = newFontStyle

        this._reportChange('configure',this,'FontStyle',newFontStyle)
        this.rerender()
      }
    }

  /**** LineHeight ****/

    protected _LineHeight:SNS_Ordinal|undefined

    public get LineHeight ():SNS_Ordinal|undefined {
      return (
        this._LineHeight == null
        ? this._Folder == null ? undefined : this._Folder.LineHeight
        : this._LineHeight
      )
    }

    public set LineHeight (newLineHeight:SNS_Ordinal|undefined) {
      allowOrdinal('visual line height',newLineHeight)
      if (this._LineHeight !== newLineHeight) {
        this._LineHeight = newLineHeight

        this._reportChange('configure',this,'LineHeight',newLineHeight)
        this.rerender()
      }
    }

  /**** ForegroundColor ****/

    protected _ForegroundColor:SNS_Color|undefined

    public get ForegroundColor ():SNS_Color|undefined {
      return (
        this._ForegroundColor == null
        ? this._Folder == null ? undefined : this._Folder.ForegroundColor
        : this._ForegroundColor
      )
    }

    public set ForegroundColor (newForegroundColor:SNS_Color|undefined) {
      allowColor('visual foreground color',newForegroundColor)
      if (this._ForegroundColor !== newForegroundColor) {
        this._ForegroundColor = newForegroundColor

        this._reportChange('configure',this,'ForegroundColor',newForegroundColor)
        this.rerender()
      }
    }

  /**** Color ****/

    public get Color ():SNS_Color|undefined { return this.ForegroundColor }
    public set Color (newColor:SNS_Color|undefined) { this.ForegroundColor = newColor }

  /**** Value ****/

    protected _Value:serializableValue = null

    public get Value ():serializableValue  { return this._Value }
    public set Value (newValue:serializableValue) {
      if (ValuesDiffer(this._Value,newValue)) {
        this._Value = newValue

        this._reportChange('configure',this,'Value',newValue)
        this.rerender()
      }
    }

  /**** editableValue (may be overwritten) ****/

    public get editableValue ():SNS_Text {
      return (this._Value == null ? '' : ''+this._Value)
    }                      // stringify non-literal values before returning them

    public set editableValue (newValue:SNS_Text) {
      this.Value = newValue      // parse text before setting non-literal values
    }

  /**** observed ****/

// @ts-ignore TS2564 allow "_observed" to be assigned upon first use
    protected _observed:Indexable

    public get observed ():Indexable {
      if (this._observed == null) {
        this._observed = observe({},{ deep:false })
      }
      return this._observed
    }
    public set observed (_:Indexable) { throwReadOnlyError('observed') }

  /**** unobserved ****/

// @ts-ignore TS2564 allow "_unobserved" to be assigned upon first use
    protected _unobserved:Indexable

    public get unobserved ():Indexable {
      if (this._unobserved == null) {
        this._unobserved = {}
      }
      return this._unobserved
    }
    public set unobserved (_:Indexable) { throwReadOnlyError('unobserved') }

  /**** memoized ****/

// @ts-ignore TS2564 allow "_memoized" to be assigned upon first use
    protected _memoized:Indexable

    public get memoized ():Indexable {
      if (this._memoized == null) {
        this._memoized = {}
      }
      return this._memoized
    }
    public set memoized (_:Indexable) { throwReadOnlyError('memoized') }

  /**** Script ****/

    public get Script ():SNS_Text|undefined {
      return (this._pendingScript == null ? this._activeScript : this._pendingScript)
    }
    public set Script (_:SNS_Text|undefined) { throwReadOnlyError('Script') }

  /**** activeScript ****/

    protected _activeScript:SNS_Text|undefined

    public get activeScript ():SNS_Text|undefined {
      return this._activeScript
    }

    public set activeScript (newScript:SNS_Text|undefined) {
      allowText('visual script',newScript)
      if (newScript === '') { newScript = undefined }      // no ".trim()" here!

      if (this._activeScript !== newScript) {
        this._activeScript = newScript
//      this.activateScript()                   // not here (because of sharing)

        this._reportChange('configure',this,'activeScript',newScript)
        this.rerender()
      }
    }

  /**** pendingScript ****/

    protected _pendingScript:SNS_Text|undefined

    public get pendingScript ():SNS_Text|undefined {
      return this._pendingScript
    }

    public set pendingScript (newScript:SNS_Text|undefined) {
      allowText('visual script',newScript)
      if (this._pendingScript !== newScript) {
        this._pendingScript = newScript

        this._reportChange('configure',this,'pendingScript',newScript)
        this.rerender()
      }
    }

  /**** activateScript ****/

    public activateScript ():void {
      let activeScript:string|undefined = (this._activeScript || '').trim()
//    if (activeScript === '') { activeScript = undefined }

      this.Error = undefined

      this._Renderer = undefined
      unregisterAllReactiveFunctionsFrom(this)

      if (activeScript != null) {
        let compiledScript
        try {
          compiledScript = new Function(
            'me,my, html,reactively, onRender,onMount,onUnmount, useBehavior, ' +
            'onClick,onInput,onDrop', activeScript
          )
        } catch (Signal:any) {
          console.error('visual script compilation failure',Signal)
          this.Error = {
            Type:'Script Compilation Failure',
            Message:''+Signal, Cause:Signal
          }                          // also autoamtically rerenders this visual
          return
        }

        const reactively = (reactiveFunction:Function):void => {
          expectFunction('reactive function',reactiveFunction)
// @ts-ignore TS2345 do not care about the specific signature of "reactiveFunction"
          registerReactiveFunctionIn(this,computed(reactiveFunction))
        }

        const onRender  = this.onRender.bind(this)
        const onMount   = this.onMount.bind(this)
        const onUnmount = this.onUnmount.bind(this)

// @ts-ignore TS7053 allow indexing for a moment
        const onClick = (this['onClick'] || propagateEvent).bind(this)
// @ts-ignore TS7053 allow indexing for a moment
        const onInput = (this['onInput'] || propagateEvent).bind(this)
// @ts-ignore TS7053 allow indexing for a moment
        const onDrop  = (this['onDrop']  || propagateEvent).bind(this)

        try {
          compiledScript.call(
            this, this,this, html,reactively, onRender,onMount,onUnmount,
            useBehavior.bind(this), onClick,onInput,onDrop
          )
        } catch (Signal) {
          console.error('visual script execution failure',Signal)
          this.Error = {
            Type:'Script Execution Failure',
            Message:''+Signal, Cause:Signal
          }                          // also automatically rerenders this visual
          return
        }
      }
      this.rerender()
    }

  /**** ScriptError - for internal use only ****/

    protected _ScriptError:SNS_Error|undefined

    public get ScriptError ():SNS_Error|undefined {
      return (this._ScriptError == null ? undefined : { ...this._ScriptError })
    }
    public set ScriptError (newScriptError:SNS_Error|undefined) {
      allowError('script error setting',newScriptError)
      if (ValuesDiffer(this._ScriptError,newScriptError)) {
        this._ScriptError = newScriptError

        this._reportChange('configure',this,'ScriptError',newScriptError)
        this.rerender()
      }
    }

  /**** CSSStyle ****/

    public get CSSStyle ():string  { return CSSStyleOfVisual(this) }
    public set CSSStyle (_:string) { throwReadOnlyError('CSSStyle') }

  /**** Renderer ****/

    protected _Renderer:Function|undefined

    public get Renderer ():Function|undefined { return this._Renderer }
    public set Renderer (newRenderer:Function|undefined) {
      allowFunction('visual renderer',newRenderer)
      if (this._Renderer !== newRenderer) {
        this._Renderer = newRenderer
        this.rerender()
      }
    }

  /**** onRender ****/

    public onRender (newRenderer:Function):void {
      expectFunction('renderer callback',newRenderer)
      this.Renderer = newRenderer
    }

  /**** Rendering ****/

    public Rendering (PropSet:Indexable):any {
      if (this.hasError) {
        return ErrorRenderer.call(this)
      }

      let Renderer = this._Renderer
      if (Renderer == null) { return '' }

      try {
        return Renderer.call(this,PropSet)
      } catch (Signal:any) {
        this.Error = {
          Type:'Rendering Failure',
          Message:''+Signal, Cause:Signal
        }
        return ErrorRenderer.call(this)
      }
    }

  /**** rerender (to be overwritten) ****/

// @ts-ignore TS2564 allow "Board" and "Sticker" to be never read
    public rerender (Board?:SNS_Board, Sticker?:SNS_Sticker):void {
      /* to be overwritten */
    }

  /**** View ****/

    private _View:HTMLElement|undefined

    public get View ():HTMLElement|undefined { return this._View }
    public set View (_:HTMLElement)          { throwReadOnlyError('View') }

  /**** isMounted ****/

    public get isMounted ():boolean  { return (this._View != null) }
    public set isMounted (_:boolean) { throwReadOnlyError('isMounted') }

  /**** onMount ****/

    protected _onMount:Function|undefined

    public onMount (newCallback:Function|undefined):void {
      allowFunction('"onMount" callback',newCallback)
      if (newCallback == null) {
        this._onMount = undefined
      } else {
        this._onMount = () => {
          try {
            newCallback.call(this)
          } catch (Signal:any) {
            this.Error = {
              Type:'"onMount" Callback Failure',
              Message:''+Signal, Cause:Signal
            }
            this.rerender()
          }
        }
      }
    }

  /**** onUnmount ****/

    protected _onUnmount:Function|undefined

    public onUnmount (newCallback:Function|undefined):void {
      allowFunction('"onUnmount" callback',newCallback)
      if (newCallback == null) {
        this._onUnmount = undefined
      } else {
        this._onUnmount = () => {
          try {
            newCallback.call(this)
          } catch (Signal:any) {
            this.Error = {
              Type:'"onUnmount" Callback Failure',
              Message:''+Signal, Cause:Signal
            }
          }
        }
      }
    }

  /**** Error - for internal use only ****/

    protected _Error:SNS_Error|undefined

    public get Error ():SNS_Error|undefined {
      return (this._Error == null ? undefined : {...this._Error})
    }
    public set Error (newError:SNS_Error|undefined) {
      allowError('error setting',newError)
      if (ValuesDiffer(this._Error,newError)) {
        this._Error = newError

        this._reportChange('configure',this,'Error',newError)
        this.rerender()
      }
    }

  /**** hasError ****/

    public get hasError ():boolean  { return (this._Error != null) }
    public set hasError (_:boolean) { throwReadOnlyError('hasError') }

  /**** _reportChange ****/

    /* protected */ _reportChange (
      Change:SNS_Change|'configure', ...ArgList:any[]
    ):void {
// @ts-ignore TS2556 what is this error good for?
      this._Project._reportChange(Change, ...ArgList)
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      Serialization.Id = this.Id                                 // special case

      const serializeProperty = (Name:string) => {
// @ts-ignore TS7053 allow indexing of "this"
        if (this['_'+Name] != null) {
// @ts-ignore TS7053 allow indexing of "this" and "Serialization"
          Serialization[Name] = this[Name]
        }
      }

      ;[
        'Name','BackgroundColor','BackgroundTexture',
        'FontFamily','FontSize','FontWeight','FontStyle','LineHeight',
        'ForegroundColor',
        'memoized','Value','activeScript','pendingScript',
      ].forEach((Name:string) => serializeProperty(Name))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      const deserializeProperty = (Name:string) => {
        if (Serialization[Name] != null) {
          try {
// @ts-ignore TS7053 allow indexing of "this" and "Serialization"
            this[Name] = Serialization[Name]   // also validates the given value
          } catch (Signal:any) {
            console.warn(
              'DeserializationError:invalid value for property ' + quoted(Name)
            )
          }
        }
      }

      deserializeProperty('activeScript')            // e.g., for custom setters

      ;[
        'Name','BackgroundColor','BackgroundTexture',
        'FontFamily','FontSize','FontWeight','FontStyle','LineHeight',
        'ForegroundColor',
        /*'memoized',*/'Value','activeScript','pendingScript',
      ].forEach((Name:string) => deserializeProperty(Name))

      if (ValueIsPlainObject(Serialization.memoized)) {
        try {
          Object.assign(this.memoized,Serialization.memoized)
        } catch (Signal:any) {
          console.warn(
            'DeserializationError:invalid value for property "memoized"'
          )
        }
      }
    }   // deserializing "activeScript" also automatically activates that script
  }

//------------------------------------------------------------------------------
//--                                SNS_Folder                                --
//------------------------------------------------------------------------------

  export class SNS_Folder extends SNS_Visual {
    protected constructor (Project:SNS_Project, Id:SNS_Id|undefined) {
      super(Project, Id)
    }   // IMPORTANT: SNS_Project constructor will pass "undefined" as "Project"

  /**** Path ****/

    public get Path ():SNS_Textline  {
      const outerFolder = this._Folder
      if (outerFolder == null) {
        return '|'
      } else {
        const localPath = this.Name || ('#' + this.Index)
        const outerPath = outerFolder.Path
        return (outerPath === '|' ? '' : outerPath) + '|' + localPath
      }
    }
    public set Path (_:SNS_Textline) { throwReadOnlyError('Path') }

  /**** BoardAtPath ****/

    public BoardAtPath (Path:SNS_Textline):SNS_Board|undefined {
      expectTextline('board path',Path)

      Path = Path.trim()
      if (Path === '') {
// @ts-ignore TS2322 a "Folder" with no outer folder is a "Board"
        return (this._Folder == null ? undefined : this as SNS_Board)
      }

      if (Path.startsWith('|')) {        // let "Project" process absolute paths
        return this._Project.BoardAtPath(Path.replace(/^(\s*\|)*/,''))
      }

      Path = Path.replace(/\|+/g,'|')        // reduce multiple consecutive "|"s

      const splitPath:(string|number)[] = Path.split('|').map(
        (Element:string) => Element.trim()      // eliminate leading/trailing ws
      ).map(
        (Element:string) => (/^#\d+$/.test(Element)    // disting. names/indices
          ? parseInt(Element.slice(1),10)
          : Element
        )
      )

      let Result:SNS_Board|undefined
        for (let i = 0, l = splitPath.length; i < l; i++) {
          const Element:string|number = splitPath[i]
          if (typeof Element === 'number') {
            Result = (Result || this).BoardAt(Element)
          } else {
            Result = (Result || this).BoardNamed(Element)
          }
          if (Result == null) { return undefined }
        }
      return Result
    }

  /**** IndexPath ****/

    public get IndexPath ():SNS_Ordinal[]  {
      const outerFolder = this._Folder
      if (outerFolder == null) {
        return []
      } else {
        return outerFolder.IndexPath.concat(this.Index)
      }
    }
    public set IndexPath (_:SNS_Ordinal[]) { throwReadOnlyError('IndexPath') }

  /**** SnapToGrid - inherited from outer folders ****/

    protected _SnapToGrid:boolean|undefined

    public get SnapToGrid ():boolean {
      return (
        ! this._SnapToGrid
        ? this._Folder == null ? false : this._Folder.SnapToGrid
        : this._SnapToGrid == true
      )
    }

    public set SnapToGrid (newSetting:boolean|undefined) {
      allowBoolean('snap-to-grid setting',newSetting)
      if (this._SnapToGrid !== newSetting) {
        this._SnapToGrid = newSetting

        this._reportChange('configure',this,'SnapToGrid',newSetting)
        this.rerender()
      }
    }

  /**** GridWidth ****/

    protected _GridWidth:SNS_Cardinal|undefined

    public get GridWidth ():SNS_Cardinal {
      return (
        this._GridWidth == null
        ? this._Folder == null ? defaultGridWidth : this._Folder.GridWidth
        : this._GridWidth
      )
    }

    public set GridWidth (newWidth:SNS_Cardinal|undefined) {
      allowCardinal('snap-to-grid width',newWidth)
      if (this._GridWidth !== newWidth) {
        this._GridWidth = newWidth

        this._reportChange('configure',this,'GridWidth',newWidth)
        this.rerender()
      }
    }

  /**** GridHeight ****/

    protected _GridHeight:SNS_Cardinal|undefined

    public get GridHeight ():SNS_Cardinal {
      return (
        this._GridHeight == null
        ? this._Folder == null ? defaultGridHeight : this._Folder.GridHeight
        : this._GridHeight
      )
    }

    public set GridHeight (newHeight:SNS_Cardinal|undefined) {
      allowCardinal('snap-to-grid height',newHeight)
      if (this._GridHeight !== newHeight) {
        this._GridHeight = newHeight

        this._reportChange('configure',this,'GridHeight',newHeight)
        this.rerender()
      }
    }

  /**** Index ****/

    public get Index ():number  {
// @ts-ignore TS2322 a "Folder" with no outer folder is a "Board"
      return (this._Folder == null ? -1 : this._Folder.IndexOfBoard(this))
    }
    public set Index (_:number) { throwReadOnlyError('Index') }

  /**** mayBeShiftedUp ****/

    public get mayBeShiftedUp ():boolean  {
// @ts-ignore TS2322 a "Folder" with no outer folder is a "Board"
      return (this._Folder == null ? false : this._Folder.mayShiftBoardUp(this))
    }
    public set mayBeShiftedUp (_:boolean) { throwReadOnlyError('mayBeShiftedUp') }

  /**** mayBeShiftedDown ****/

    public get mayBeShiftedDown ():boolean  {
// @ts-ignore TS2322 a "Folder" with no outer folder is a "Board"
      return (this._Folder == null ? false : this._Folder.mayShiftBoardDown(this))
    }
    public set mayBeShiftedDown (_:boolean) { throwReadOnlyError('mayBeShiftedDown') }

  /**** mayBeShiftedIn ****/

    public get mayBeShiftedIn ():boolean  {
// @ts-ignore TS2322 a "Folder" with no outer folder is a "Board"
      return (this._Folder == null ? false : this._Folder.mayShiftBoardIn(this))
    }
    public set mayBeShiftedIn (_:boolean) { throwReadOnlyError('mayBeShiftedIn') }

  /**** mayBeShiftedOut ****/

    public get mayBeShiftedOut ():boolean  {
// @ts-ignore TS2322 a "Folder" with no outer folder is a "Board"
      return (this._Folder == null ? false : this._Folder.mayShiftBoardOut(this))
    }
    public set mayBeShiftedOut (_:boolean) { throwReadOnlyError('mayBeShiftedOut') }

  /**** containsFolder ****/

    public containsFolder (Folder:SNS_Folder):boolean {
      expectFolder('folder',Folder)

      Folder = Folder.Folder as SNS_Folder
        while (Folder != null) {
          if (Folder === this) { return true }
          Folder = Folder.Folder as SNS_Folder
        }
      return false
    }

  /**** BoardList ****/

    protected _BoardList:SNS_Board[] = []

    public get BoardList ():SNS_Board[]  { return this._BoardList.slice() }
    public set BoardList (_:SNS_Board[]) { throwReadOnlyError('BoardList') }

  /**** BoardCount ****/

    public get BoardCount ():number  { return this._BoardList.length }
    public set BoardCount (_:number) { throwReadOnlyError('BoardCount') }

  /**** IndexOfBoard ****/

    public IndexOfBoard (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):number {
      const Board = this.Board(BoardOrNameOrIndex)
      if (Board == null) { return -1 }

      return this._BoardList.indexOf(Board)
    }

  /**** Board ****/

    public Board (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):SNS_Board|undefined {
      expectValue('board, name or index',BoardOrNameOrIndex)

      switch (true) {
        case ValueIsBoard(BoardOrNameOrIndex):
          const Board = BoardOrNameOrIndex as SNS_Board
          return (Board._Folder === this ? Board : undefined)
        case ValueIsInteger(BoardOrNameOrIndex):
          let Index = BoardOrNameOrIndex as number
          if (Index < 0) { Index += this._BoardList.length }
          return this._BoardList[Index]
        case ValueIsName(BoardOrNameOrIndex):
          return this.BoardNamed(BoardOrNameOrIndex as SNS_Name)
      }

      throwError(
        'InvalidArgument: no valid board, board name or board index given'
      )
    }

  /**** existingBoard ****/

    public existingBoard (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):SNS_Board {
      let Board = this.Board(BoardOrNameOrIndex)
        if (Board == null) throwError(
          'BoardNotFound: the desired board could not be found'
        )
      return Board
    }

  /**** BoardNamed ****/

    public BoardNamed (Name:SNS_Name):SNS_Board|undefined {
      expectName('SNS board name',Name)
      Name = Name.trim().toLowerCase()

      let Result:SNS_Board|undefined = undefined
        this._BoardList.forEach((Board:SNS_Board) => {
          if (
            (Result == null) &&
            (Board.Name != null) && (Board.Name.toLowerCase() === Name)
          ) {
            Result = Board
          }
        })
      return Result
    }

  /**** BoardAt ****/

    public BoardAt (Index:number):SNS_Board|undefined {
      expectInteger('SNS board index',Index)
      if (Index < 0) { Index += this._BoardList.length }
      return this._BoardList[Index]
    }

  /**** hasBoard ****/

    public hasBoard (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):boolean {
      return (this.Board(BoardOrNameOrIndex) != null)
    }

  /**** newBoardAt ****/

    public newBoardAt (Index?:number, Id?:SNS_Id):SNS_Board {
      return (
        Id == null
        ? this.BoardDeserializedAt({},Index)
        : this.BoardDeserializedAt({ Id },Index)
      )
    }

  /**** BoardDeserializedAt - nota bene: needs explicit script activation! ****/

    public BoardDeserializedAt (Serialization:Serializable, Index?:number):SNS_Board {
      expectSerializable('board serialization',Serialization)
      allowInteger     ('board insertionindex',Index)

      if (Index == null) {
        Index = this._BoardList.length
      } else {
        if (Index < 0) { Index += this._BoardList.length }
        Index = Math.max(0,Math.min(Index,this._BoardList.length))
      }

      const Id = allowedId('board id',Serialization.Id)

      let newBoard = new SNS_Board(this._Project, Id)        // registers itself
        this._attachBoardAt(newBoard,Index)

        newBoard._deserializeConfigurationFrom(Serialization)
// @ts-ignore TS2445 "newBoard" *IS* an SNS_Board
        newBoard._deserializeStickersFrom(Serialization)
// @ts-ignore TS2445 "newBoard" *IS* an SNS_Board
        newBoard._deserializeBoardsFrom(Serialization)

        this.rerender()
      return newBoard
    }

  /**** DuplicateOfBoardAt ****/

    public DuplicateOfBoardAt (Index:number):SNS_Board {
      expectInteger('board index',Index)
      const Board = this.existingBoard(Index)                             // DRY
      const Serialization = Board.Serialization
        removeIdsFrom(Serialization)
      return this.BoardDeserializedAt(Serialization,Index+1)
    }

  /**** mayShiftBoardUp/Down ****/

    public mayShiftBoardUp (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):boolean {
      const Board = this.existingBoard(BoardOrNameOrIndex)
      return (this._BoardList.indexOf(Board) > 0)
    }

    public mayShiftBoardDown (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):boolean {
      const Board = this.existingBoard(BoardOrNameOrIndex)

      const BoardList  = this._BoardList
      const BoardIndex = BoardList.indexOf(Board)
      return (BoardIndex >= 0) && (BoardIndex < BoardList.length-1)
    }

  /**** shiftBoardToTop ****/

    public shiftBoardToTop (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):void {
      const Board = this.existingBoard(BoardOrNameOrIndex)
      if (this.mayShiftBoardUp(Board)) {                       // keeps code DRY
        const oldIndex = this._BoardList.indexOf(Board)
        this._detachBoardAt(oldIndex)
        this._attachBoardAt(Board,0)
        this.rerender()
      }
    }

  /**** shiftBoardUp ****/

    public shiftBoardUp (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):void {
      const Board = this.existingBoard(BoardOrNameOrIndex)
      if (this.mayShiftBoardUp(Board)) {                       // keeps code DRY
        const oldIndex = this._BoardList.indexOf(Board)
        this._detachBoardAt(oldIndex)
        this._attachBoardAt(Board,oldIndex-1)
        this.rerender()
      }
    }

  /**** shiftBoardDown ****/

    public shiftBoardDown (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):void {
      const Board = this.existingBoard(BoardOrNameOrIndex)
      if (this.mayShiftBoardDown(Board)) {                     // keeps code DRY
        const oldIndex = this._BoardList.indexOf(Board)
        this._detachBoardAt(oldIndex)
        this._attachBoardAt(Board,oldIndex+1)
        this.rerender()
      }
    }

  /**** shiftBoardToBottom ****/

    public shiftBoardToBottom (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):void {
      const Board = this.existingBoard(BoardOrNameOrIndex)
      if (this.mayShiftBoardDown(Board)) {                     // keeps code DRY
        const oldIndex = this._BoardList.indexOf(Board)
        this._detachBoardAt(oldIndex)
        this._attachBoardAt(Board,this._BoardList.length)
        this.rerender()
      }
    }

  /**** shiftBoardTo ****/

    public shiftBoardTo (
      BoardOrNameOrIndex:SNS_Board|SNS_Name|number, newIndex:number
    ):void {
      const Board = this.existingBoard(BoardOrNameOrIndex)

      expectInteger('SNS board index',newIndex)
      if (newIndex < 0) { newIndex += this._BoardList.length }
      newIndex = Math.max(0,Math.min(newIndex,this._BoardList.length))

      const oldIndex = this._BoardList.indexOf(Board)
      if (oldIndex === newIndex) { return }

      this._detachBoardAt(oldIndex)
      this._attachBoardAt(Board,newIndex)

      this.rerender()
    }

  /**** shiftBoardsByIndex ****/

    public shiftBoardsByIndex (
      oldIndex:number, newIndex:number, Count:number
    ):void {
      const BoardCount = this._BoardList.length

      expectIntegerInRange('old index',oldIndex,0,BoardCount)
      expectIntegerInRange('new index',newIndex,0,BoardCount)

      const BoardsToShift = this._BoardList.slice(oldIndex,oldIndex+Count)
      BoardsToShift.forEach((_:any) => this._detachBoardAt(oldIndex))

      if (newIndex > oldIndex) { newIndex -= Count }
      BoardsToShift.forEach(
        (Board:SNS_Board,i:number) => this._attachBoardAt(Board,newIndex+i)
      )

      this.rerender()
    }

  /**** mayShiftBoardIn/Out ****/

    public mayShiftBoardIn (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):boolean {
      const Board = this.existingBoard(BoardOrNameOrIndex)
      return this.mayShiftBoardDown(Board)                                // DRY
    }

    public mayShiftBoardOut (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):boolean {
      return (this._Folder != null)
    }

  /**** shiftBoardIn ****/

    public shiftBoardIn (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):void {
      const Board = this.existingBoard(BoardOrNameOrIndex)
      if (this.mayShiftBoardIn(Board)) {                       // keeps code DRY
        const oldIndex  = this._BoardList.indexOf(Board)
        const newFolder = this._BoardList[oldIndex+1]

        this._detachBoardAt(oldIndex)
        newFolder._attachBoardAt(Board,0)

        this.rerender()
        newFolder.rerender()
      }
    }

  /**** shiftBoardOut ****/

    public shiftBoardOut (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):void {
      const Board = this.existingBoard(BoardOrNameOrIndex)
      if (this.mayShiftBoardOut(Board)) {                      // keeps code DRY
        const oldIndex  = this._BoardList.indexOf(Board)
        const newFolder = this._Folder as SNS_Folder

        this._detachBoardAt(oldIndex)
        newFolder._attachBoardAt(Board,newFolder.Index)

        this.rerender()
        newFolder.rerender()
      }
    }

  /**** mayMoveBoardTo ****/

    public mayMoveBoardTo (
      BoardOrNameOrIndex:SNS_Board|SNS_Name|number,
      FolderOrNameOrIndex:SNS_Folder|SNS_Name|number, Index?:number
    ):boolean {
      const Board = this.existingBoard(BoardOrNameOrIndex)
      const Folder = (
        ValueIsFolder(FolderOrNameOrIndex)
        ? FolderOrNameOrIndex as SNS_Folder
        : this.existingBoard(FolderOrNameOrIndex as SNS_Name|number)
      )
      allowInteger('insertion index',Index)

      return (
        Folder.isAttached && (Folder !== Board) && ! Board.containsFolder(Folder)
      )
    }

  /**** moveBoardTo ****/

    public moveBoardTo (
      BoardOrNameOrIndex:SNS_Board|SNS_Name|number,
      FolderOrNameOrIndex:SNS_Folder|SNS_Name|number, Index?:number
    ):void {
      const Board = this.existingBoard(BoardOrNameOrIndex)
      const newFolder = (
        ValueIsFolder(FolderOrNameOrIndex)
        ? FolderOrNameOrIndex as SNS_Folder
        : this.existingBoard(FolderOrNameOrIndex as SNS_Name|number)
      )
      allowInteger('insertion index',Index)

      if (
        newFolder.isAttached && (newFolder !== Board) &&
        ! Board.containsFolder(newFolder)
      ) {
        const oldIndex = this._BoardList.indexOf(Board)

        let newIndex = (Index == null ? newFolder.BoardCount : Index)
        if (newIndex < 0) { newIndex += newFolder.BoardCount }
        newIndex = Math.max(0, Math.min(newIndex,newFolder.BoardCount))

        this._detachBoardAt(oldIndex)
        newFolder._attachBoardAt(Board,newIndex)

        this.rerender()
        newFolder.rerender()
      }
    }

  /**** destroyBoard ****/

    public destroyBoard (BoardOrNameOrIndex:SNS_Board|SNS_Name|number):void {
      const Board = this.Board(BoardOrNameOrIndex)
      if (Board == null) {
        if (ValueIsBoard(BoardOrNameOrIndex)) throwError(
          'NoSuchBoard: the given board could not be found'
        )
        return
      }

      ;(Board as SNS_Board).clear()
      unregisterAllReactiveFunctionsFrom(Board as SNS_Board)

      const oldIndex = this._BoardList.indexOf(Board as SNS_Board)
      this._detachBoardAt(oldIndex)

      unregisterFolder(Board)
// @ts-ignore TS2322 allow _Project to become undefined upon deletion
      Board._Project = undefined         // detaches this board from the project

      this._reportChange('destroyBoard',Board)
      this.rerender()
    }

  /**** clear ****/

    public clear ():void {
      for (let i = 0, l = this._BoardList.length; i < l; i++) {
        this.destroyBoard(this._BoardList[0])
      }
    }

  /**** _attachBoardAt ****/

    /* protected */ _attachBoardAt (Board:SNS_Board, Index:number):void {
      Board._Folder = this
      this._BoardList.splice(Index,0, Board)
      this._reportChange('attachBoard', Board, this, Index)
    }

  /**** _detachBoardAt ****/

    /* protected */ _detachBoardAt (Index:number):void {
      const Board = this._BoardList.splice(Index,1)[0]
      Board._Folder = undefined
      this._reportChange('detachBoard', Board, this, Index)
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      const serializeProperty = (Name:string) => {
// @ts-ignore TS7053 allow indexing of "this"
        if (this['_'+Name] != null) {
// @ts-ignore TS7053 allow indexing of "Serialization"
          Serialization[Name] = this[Name]
        }
      }

      ;[
        'SnapToGrid','GridWidth','GridHeight',
      ].forEach((Name:string) => serializeProperty(Name))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      const deserializeProperty = (Name:string) => {
        if (Serialization[Name] != null) {
          try {
// @ts-ignore TS7053 allow indexing of "this"
            this[Name] = Serialization[Name]   // also validates the given value
          } catch (Signal:any) {
            console.warn(
              'DeserializationError:invalid value for property ' + quoted(Name)
            )
          }
        }
      }

      ;[
        'SnapToGrid','GridWidth','GridHeight',
      ].forEach((Name:string) => deserializeProperty(Name))
    }

  /**** _serializeBoardsInto ****/

    protected _serializeBoardsInto (Serialization:Serializable):void {
      const BoardList = this._BoardList.slice()
      if (BoardList.length > 0) {
        Serialization.BoardList = BoardList.map(
          (Board:SNS_Board) => Board.Serialization
        )
      }
    }

  /**** _deserializeBoardsFrom ****/

    protected _deserializeBoardsFrom (Serialization:Serializable):void {
      const BoardList = this._BoardList
      if (BoardList.length > 0) { this.clear() }

      if (
        ValueIsListSatisfying(Serialization.BoardList,ValueIsPlainObject) &&
        ((Serialization.BoardList as any[]).length > 0)
      ) {
        (Serialization.BoardList as Serializable[]).forEach(
          (BoardSerialization:Serializable, Index:number) => {
            this.BoardDeserializedAt(BoardSerialization,Index)
          }
        )
      }
    }
  }

//------------------------------------------------------------------------------
//--                               SNS_Project                                --
//------------------------------------------------------------------------------

  const SNS_ProjectPropertySet:Indexable = Object.create(null)
    ;[
      'Name','BackgroundColor','BackgroundTexture',
      'FontFamily','FontSize','FontWeight','FontStyle','LineHeight',
      'ForegroundColor',
      'memoized','Value','activeScript','pendingScript',
      'SnapToGrid','GridWidth','GridHeight',
    ].forEach((Property:string) => SNS_ProjectPropertySet[Property] = true)

  export class SNS_Project extends SNS_Folder {
    protected constructor (Name:SNS_Name) {
// @ts-ignore TS2345 allow "undefined" here, as "this" is not possible
      super(undefined,undefined)
      this._Project = this // n.b. "this" must not be passed to "super"

      expectName('project name',Name)
      this._Name = Name
    }

  /**** Name ****/

    public get Name ():SNS_Name|undefined  { return this._Name }
    public set Name (_:SNS_Name|undefined) { throwReadOnlyError('Name') }

  /**** IndexPath ****/

    public get IndexPath ():SNS_Ordinal[]  { return [] }
    public set IndexPath (_:SNS_Ordinal[]) { throwReadOnlyError('IndexPath') }

  /**** BoardAtIndexPath ****/

    public BoardAtIndexPath (IndexPath:SNS_Ordinal[]):SNS_Board|undefined {
      expectListSatisfying('board index path',IndexPath,ValueIsOrdinal)

      if (IndexPath.length === 0) {
        return undefined
      } else {
        let Result:SNS_Board|undefined
          for (let i = 0, l = IndexPath.length; i < l; i++) {
            Result = (Result || this).BoardAt(IndexPath[i])
            if (Result == null) { return undefined }
          }
        return Result
      }
    }

  /**** FolderWithId ****/

    public FolderWithId (Id:SNS_Id):SNS_Folder|undefined {
      expectId('folder id',Id)
      return FolderWithId(this,Id)
    }

  /**** BoardWithId ****/

    public BoardWithId (Id:SNS_Id):SNS_Board|undefined {
      const Folder = FolderWithId(this,Id)
      if (ValueIsProject(Folder)) throwError(
        'NotABoard: the folder with the given id is not a board, but the project'
      )

      return Folder as SNS_Board
    }

  /**** StickerWithId ****/

    public StickerWithId (Id:SNS_Id):SNS_Sticker|undefined {
      expectId('sticker id',Id)
      return StickerWithId(this,Id)
    }

  /**** recursivelyActivateAllScripts ****/

    public recursivelyActivateAllScripts ():void {
      this.activateScript();

      this._BoardList.forEach(
        (Board:SNS_Board) => Board.recursivelyActivateAllScripts()
      )
    }

  /**** onChange ****/

    protected _onChange:SNS_onChangeCallback[] = []

    public onChange (Callback:SNS_onChangeCallback):void {
      expectFunction('"onChange" callback',Callback)
      this._onChange.push(Callback)
    }

  /**** _reportChange ****/

    /* protected */ _reportChange (
      Change:SNS_Change|'configure', Visual:SNS_Visual, ...ArgList:any[]
    ):void {
      if (Change === 'configure') {
        Change = ValueIsFolder(Visual) ? 'configureFolder' : 'configureSticker'
      }

      ArgList.unshift(this, Change, Visual)
      this._onChange.forEach(
// @ts-ignore TS2345 skip checking of individual "ArgList" elements
        (Callback:SNS_onChangeCallback) => Callback.apply(this,ArgList)
      )
    }

  /**** onRendering ****/

    protected _onRendering:SNS_onRenderingCallback[] = []

    public onRendering (Callback:SNS_onRenderingCallback):void {
      expectFunction('"onRendering" callback',Callback)
      this._onRendering.push(Callback)
    }

  /**** rerender - warning: semantics differs from that of other visuals ****/

    public rerender (Board?:SNS_Board, Sticker?:SNS_Sticker):void {
      this._onRendering.forEach(
        (Callback:SNS_onRenderingCallback) => Callback(this, Board, Sticker)
      )
    }

  /**** onError ****/

    protected _onError:SNS_onErrorCallback[] = []

    public onError (Callback:SNS_onErrorCallback):void {
      expectFunction('"onError" callback',Callback)
      this._onError.push(Callback)
    }

  /**** showError ****/

    public showError (Visual:SNS_Visual, Error:SNS_Error):void {
      this._onError.forEach(
        (Callback:SNS_onErrorCallback) => Callback(this, Visual, Error)
      )
    }

  /**** Serialization ****/

    public get Serialization ():Serializable {
      const Result:Serializable = {}
        this._serializeConfigurationInto(Result)
        this._serializeBoardsInto(Result)

        delete Result.Id               // do not serialize the "Id" of a project
      return Result
    }
    public set Serialization (_:Serializable) { throwReadOnlyError('Serialization') }

  /**** deserializedFrom - nota bene: needs explicit script activation! ****/

    public static deserializedFrom (
      Name:SNS_Name, Serialization:Serializable
    ):SNS_Project {
      expectName('project name',Name)

      const Result = new SNS_Project(Name)
        delete Serialization.Name
        Result._Name = Name

        Result._deserializeConfigurationFrom(Serialization)
        Result._deserializeBoardsFrom(Serialization)
      return Result
    }
  }

//------------------------------------------------------------------------------
//--                                SNS_Board                                 --
//------------------------------------------------------------------------------

  const SNS_BoardPropertySet:Indexable = Object.create(null)
    ;[
      'Name','BackgroundColor','BackgroundTexture',
      'FontFamily','FontSize','FontWeight','FontStyle','LineHeight',
      'ForegroundColor',
      'memoized','Value','activeScript','pendingScript',
      'SnapToGrid','GridWidth','GridHeight',
    ].forEach((Property:string) => SNS_BoardPropertySet[Property] = true)

  export class SNS_Board extends SNS_Folder {
    /* protected */ constructor (Project:SNS_Project, Id:SNS_Id|undefined) {
      super(Project, Id)
      registerFolder(Project,this)

      Project._reportChange('createBoard', this)
    }

  /**** StickerList ****/

    protected _StickerList:SNS_Sticker[] = []

    public get StickerList ():SNS_Sticker[]  { return this._StickerList.slice() }
    public set StickerList (_:SNS_Sticker[]) { throwReadOnlyError('StickerList') }

  /**** StickerCount ****/

    public get StickerCount ():number  { return this._StickerList.length }
    public set StickerCount (_:number) { throwReadOnlyError('StickerCount') }

  /**** IndexOfSticker ****/

    public IndexOfSticker (Sticker:SNS_Sticker):number {
      expectSticker('SNS sticker to search for',Sticker)
      return this._StickerList.indexOf(Sticker)
    }

  /**** Sticker ****/

    public Sticker (StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number):SNS_Sticker|undefined {
      expectValue('sticker, name or index',StickerOrNameOrIndex)

      switch (true) {
        case ValueIsSticker(StickerOrNameOrIndex):
          const Sticker = StickerOrNameOrIndex as SNS_Sticker
          return (Sticker.Board === this ? Sticker : undefined)
        case ValueIsInteger(StickerOrNameOrIndex):
          const Index = StickerOrNameOrIndex as number
          return this._StickerList[Index]
        case ValueIsName(StickerOrNameOrIndex):
          return this.StickerNamed(StickerOrNameOrIndex as SNS_Name)
      }

      throwError(
        'InvalidArgument: no valid sticker, sticker name or sticker index given'
      )
    }

  /**** existingSticker ****/

    public existingSticker (StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number):SNS_Sticker {
      let Sticker = this.Sticker(StickerOrNameOrIndex)
        if (Sticker == null) throwError(
          'StickerNotFound: the desired sticker could not be found'
        )
      return Sticker
    }

  /**** StickerNamed ****/

    public StickerNamed (Name:SNS_Name):SNS_Sticker|undefined {
      expectName('SNS sticker name',Name)
      Name = Name.trim().toLowerCase()

      let Result:SNS_Sticker|undefined = undefined
        this._StickerList.forEach((Sticker:SNS_Sticker) => {
          if (
            (Result == null) &&
            (Sticker.Name != null) && (Sticker.Name.toLowerCase() === Name)
          ) {
            Result = Sticker
          }
        })
      return Result
    }

  /**** StickerAt ****/

    public StickerAt (Index:number):SNS_Sticker|undefined {
      expectInteger('SNS sticker index',Index)
      if (Index < 0) { Index += this._StickerList.length }
      return this._StickerList[Index]
    }

  /**** hasSticker ****/

    public hasSticker (StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number):boolean {
      return (this.Sticker(StickerOrNameOrIndex) != null)
    }

  /**** newStickerAt ****/

    public newStickerAt (Index?:number, Id?:SNS_Id):SNS_Sticker {
      return (
        Id == null
        ? this.StickerDeserializedAt({},Index)
        : this.StickerDeserializedAt({ Id },Index)
      )
    }

  /**** StickerDeserializedAt - nota bene: needs explicit script activation! ****/

    public StickerDeserializedAt (Serialization:Serializable, Index?:number):SNS_Sticker {
      expectSerializable('sticker serialization',Serialization)
      allowInteger          ('SNS sticker index',Index)

      if (Index == null) {
        Index = this._StickerList.length
      } else {
        if (Index < 0) { Index += this._StickerList.length }
        Index = Math.max(0,Math.min(Index,this._StickerList.length))
      }

      const Id = allowedId('sticker id',Serialization.Id)

      let newSticker = new SNS_Sticker(this.Project, Id)     // registers itself
        this._attachStickerAt(newSticker,Index)

// @ts-ignore TS2445 "newSticker" *IS* an SNS_Visual
        newSticker._deserializeConfigurationFrom(Serialization)

        this.rerender()
      return newSticker
    }

  /**** DuplicateOfStickerAt ****/

    public DuplicateOfStickerAt (Index:number):SNS_Sticker {
      expectInteger('SNS sticker index',Index)
      const Sticker = this.existingSticker(Index)                         // DRY
      const Serialization = Sticker.Serialization
        removeIdsFrom(Serialization)
      return this.StickerDeserializedAt(Serialization,Index+1)
    }

  /**** mayShiftStickerUp/Down ****/

    public mayShiftStickerUp (StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number):boolean {
      const Sticker = this.existingSticker(StickerOrNameOrIndex)
      return (this._StickerList.indexOf(Sticker) > 0)
    }

    public mayShiftStickerDown (StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number):boolean {
      const Sticker = this.existingSticker(StickerOrNameOrIndex)

      const StickerList  = this._StickerList
      const StickerIndex = StickerList.indexOf(Sticker)
      return (StickerIndex >= 0) && (StickerIndex < StickerList.length-1)
    }

  /**** shiftStickerToTop ****/

    public shiftStickerToTop (StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number):void {
      const Sticker = this.existingSticker(StickerOrNameOrIndex)
      if (this.mayShiftStickerUp(Sticker)) {                   // keeps code DRY
        const oldIndex = this._StickerList.indexOf(Sticker)
        this._detachStickerAt(oldIndex)
        this._attachStickerAt(Sticker,0)
        this.rerender()
      }
    }

  /**** shiftStickerUp ****/

    public shiftStickerUp (StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number):void {
      const Sticker = this.existingSticker(StickerOrNameOrIndex)
      if (this.mayShiftStickerUp(Sticker)) {                   // keeps code DRY
        const oldIndex = this._StickerList.indexOf(Sticker)
        this._detachStickerAt(oldIndex)
        this._attachStickerAt(Sticker,oldIndex-1)
        this.rerender()
      }
    }

  /**** shiftStickerDown ****/

    public shiftStickerDown (StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number):void {
      const Sticker = this.existingSticker(StickerOrNameOrIndex)
      if (this.mayShiftStickerDown(Sticker)) {                 // keeps code DRY
        const oldIndex = this._StickerList.indexOf(Sticker)
        this._detachStickerAt(oldIndex)
        this._attachStickerAt(Sticker,oldIndex+1)
        this.rerender()
      }
    }

  /**** shiftStickerToBottom ****/

    public shiftStickerToBottom (StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number):void {
      const Sticker = this.existingSticker(StickerOrNameOrIndex)
      if (this.mayShiftStickerDown(Sticker)) {                 // keeps code DRY
        const oldIndex = this._StickerList.indexOf(Sticker)
        this._detachStickerAt(oldIndex)
        this._attachStickerAt(Sticker,this._StickerList.length)
        this.rerender()
      }
    }

  /**** shiftStickerTo ****/

    public shiftStickerTo (
      StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number, newIndex:number
    ):void {
      const Sticker = this.existingSticker(StickerOrNameOrIndex)

      expectInteger('SNS sticker index',newIndex)
      if (newIndex < 0) { newIndex += this._StickerList.length }
      newIndex = Math.max(0,Math.min(newIndex,this._StickerList.length-1))

      const oldIndex = this._StickerList.indexOf(Sticker)
      if (oldIndex === newIndex) { return }

      this._detachStickerAt(oldIndex)
      this._attachStickerAt(Sticker,newIndex)

      this.rerender()
    }

  /**** shiftStickersByIndex ****/

    public shiftStickersByIndex (
      oldIndex:number, newIndex:number, Count:number
    ):void {
      const StickerCount = this._StickerList.length

      expectIntegerInRange('old index',oldIndex,0,StickerCount)
      expectIntegerInRange('new index',newIndex,0,StickerCount)

      const StickersToShift = this._StickerList.slice(oldIndex,oldIndex+Count)
      StickersToShift.forEach((_:any) => this._detachStickerAt(oldIndex))

      if (newIndex > oldIndex) { newIndex -= Count }
      StickersToShift.forEach(
        (Sticker:SNS_Sticker,i:number) => this._attachStickerAt(Sticker,newIndex+i)
      )

      this.rerender()
    }

  /**** destroySticker ****/

    public destroySticker (StickerOrNameOrIndex:SNS_Sticker|SNS_Name|number):void {
      const Sticker = this.Sticker(StickerOrNameOrIndex)
      if (Sticker == null) {
        if (ValueIsSticker(StickerOrNameOrIndex)) throwError(
          'NoSuchSticker: the given sticker could not be found'
        )
        return
      }

      unregisterAllReactiveFunctionsFrom(Sticker as SNS_Sticker)

      const oldIndex = this._StickerList.indexOf(Sticker as SNS_Sticker)
      this._detachStickerAt(oldIndex)

      unregisterSticker(Sticker)
// @ts-ignore TS2322 allow _Project to become undefined upon deletion
      Sticker._Project = undefined     // detaches this sticker from the project

      this._reportChange('destroySticker',Sticker)
      this.rerender()
    }

  /**** clear ****/

    public clear ():void {
      super.clear()                                  // deletes all inner boards

      for (let i = 0, l = this._StickerList.length; i < l; i++) {
        this.destroySticker(this._StickerList[0])
      }
    }

  /**** recursivelyActivateAllScripts ****/

    public recursivelyActivateAllScripts ():void {
      this.activateScript();

      this._BoardList.forEach(
        (Board:SNS_Board) => Board.recursivelyActivateAllScripts()
      )

      this._StickerList.forEach(
        (Sticker:SNS_Sticker) => Sticker.activateScript()
      )
    }

  /**** Rendering ****/

    public Rendering (PropSet:Indexable):any {
      if (this.hasError) {
        return ErrorRenderer.call(this)
      }

      let Renderer = this._Renderer
      if (Renderer == null) { return '' }

      try {
        return Renderer.call(this,PropSet)
      } catch (Signal:any) {
        this.Error = {
          Type:'Rendering Failure',
          Message:''+Signal, Cause:Signal
        }
        return ErrorRenderer.call(this)
      }
    }

  /**** rerender ****/

    public rerender ():void {
      this.Project.rerender(this)
    }

  /**** onClick ****/

    protected _onClick:Function|undefined

    public onClick (newHandler:Function):void {
      expectFunction('"click" event handler',newHandler)
      this._onClick = newHandler
    }

  /**** onDrop ****/

    protected _onDrop:Function|undefined

    public onDrop (newHandler:Function):void {
      expectFunction('"drop" event handler',newHandler)
      this._onDrop = newHandler
    }

  /**** _attachStickerAt ****/

    /* protected */ _attachStickerAt (Sticker:SNS_Sticker, Index:number):void {
// @ts-ignore TS2446 this is a hack, I know
      Sticker._Folder = this
      this._StickerList.splice(Index,0, Sticker)
      this._reportChange('attachSticker', Sticker, this, Index)
    }

  /**** _detachStickerAt ****/

    /* protected */ _detachStickerAt (Index:number):void {
      const Sticker = this._StickerList.splice(Index,1)[0]
// @ts-ignore TS2446 this is a hack, I know
      Sticker._Folder = undefined
      this._reportChange('detachSticker', Sticker, this, Index)
    }

  /**** Serialization ****/

    public get Serialization ():Serializable {
      const Result:Serializable = {}
        this._serializeConfigurationInto(Result)
        this._serializeBoardsInto(Result)
        this._serializeStickersInto(Result)
      return Result
    }
    public set Serialization (_:Serializable) { throwReadOnlyError('Serialization') }

  /**** _serializeStickersInto ****/

    protected _serializeStickersInto (Serialization:Serializable):void {
      const StickerList = this._StickerList.slice()
      if (StickerList.length > 0) {
        Serialization.StickerList = StickerList.map(
          (Sticker:SNS_Sticker) => Sticker.Serialization
        )
      }
    }

  /**** _deserializeStickersFrom ****/

    protected _deserializeStickersFrom (Serialization:Serializable):void {
      const StickerList = this._StickerList
      if (StickerList.length > 0) { this.clear() }

      if (
        ValueIsListSatisfying(Serialization.StickerList,ValueIsPlainObject) &&
        ((Serialization.StickerList as Serializable[]).length > 0)
      ) {
        (Serialization.StickerList as Serializable[]).forEach(
          (StickerSerialization:Serializable, Index:number) => {
            this.StickerDeserializedAt(StickerSerialization,Index)
          }
        )
      }
    }
  }

//------------------------------------------------------------------------------
//--                               CNS_Sticker                                --
//------------------------------------------------------------------------------

  const SNS_StickerPropertySet:Indexable = Object.create(null)
    ;[
      'Name',
      'Lock','Selectability','Visibility','Enabling',
      'minWidth','maxWidth','minHeight','maxHeight',
      'BackgroundColor','BackgroundTexture',
      'FontFamily','FontSize','FontWeight','FontStyle','LineHeight',
      'ForegroundColor',
      'memoized','Value','activeScript','pendingScript',
    ].forEach((Property:string) => SNS_StickerPropertySet[Property] = true)

  export class SNS_Sticker extends SNS_Visual {
    /* protected */ constructor (Project:SNS_Project, Id:SNS_Id|undefined) {
      super(Project, Id)
      registerSticker(Project,this)

      Project._reportChange('createSticker', this)
    }

  /**** Board ****/

    public get Board ():SNS_Board  { return this._Folder as SNS_Board }
    public set Board (_:SNS_Board) { throwReadOnlyError('Board') }

  /**** BackgroundColor ****/

    public get BackgroundColor ():SNS_Color|undefined {
      return this._BackgroundColor
    }

    public set BackgroundColor (newColor:SNS_Color|undefined) {
      allowColor('sticker background color',newColor)
      if (this._BackgroundColor !== newColor) {
        this._BackgroundColor = newColor

        this._reportChange('configure',this,'BackgroundColor',newColor)
        this.rerender()
      }
    }

  /**** BackgroundTexture ****/

    public get BackgroundTexture ():SNS_URL|undefined {
      return this._BackgroundTexture
    }

    public set BackgroundTexture (newTexture:SNS_URL|undefined) {
      allowURL('sticker background texture',newTexture)
      if (this._BackgroundTexture !== newTexture) {
        this._BackgroundTexture = newTexture

        this._reportChange('configure',this,'BackgroundTexture',newTexture)
        this.rerender()
      }
    }

  /**** Index ****/

    public get Index ():number  { return (this._Folder as SNS_Board).IndexOfSticker(this) }
    public set Index (_:number) { throwReadOnlyError('Index') }

  /**** mayBeShiftedUp ****/

    public get mayBeShiftedUp ():boolean  { return (this._Folder as SNS_Board).mayShiftStickerUp(this) }
    public set mayBeShiftedUp (_:boolean) { throwReadOnlyError('mayBeShiftedUp') }

  /**** mayBeShiftedDown ****/

    public get mayBeShiftedDown ():boolean  { return (this._Folder as SNS_Board).mayShiftStickerDown(this) }
    public set mayBeShiftedDown (_:boolean) { throwReadOnlyError('mayBeShiftedDown') }

  /**** minWidth ****/

    protected _minWidth:SNS_Dimension|undefined = undefined

    public get minWidth ():SNS_Dimension {
      return (this._minWidth == null ? defaultMinWidth : this._minWidth)
    }
    public set minWidth (newMinWidth:SNS_Dimension|undefined) {
      allowDimension('minimal sticker width',newMinWidth)
      if (this._minWidth !== newMinWidth) {
        this._minWidth = newMinWidth
        this._reportChange('configure',this,'minWidth',newMinWidth)

        if (
          (this._minWidth != null) && (this._maxWidth != null) &&
          (this._maxWidth < this._minWidth)
        ) {
          this._maxWidth = newMinWidth
          this._reportChange('configure',this,'maxWidth',this._minWidth)
        }

        if ((this._minWidth != null) && (this._Geometry.Width < this._minWidth)) {
          this.Width = this._minWidth
        }
        this.rerender()
      }
    }

  /**** maxWidth ****/

    protected _maxWidth:SNS_Dimension|undefined = defaultMaxWidth

    public get maxWidth ():SNS_Dimension|undefined  { return this._maxWidth }
    public set maxWidth (newMaxWidth:SNS_Dimension|undefined) {
      allowDimension('maximal sticker width',newMaxWidth)
      if ((newMaxWidth != null) && (this._minWidth != null)) {
        newMaxWidth = Math.max(this._minWidth,newMaxWidth)
      }

      if (this._maxWidth !== newMaxWidth) {
        this._maxWidth = newMaxWidth
        this._reportChange('configure',this,'maxWidth',this._maxWidth)

        if ((this._maxWidth != null) && (this._Geometry.Width > this._maxWidth)) {
          this.Width = this._maxWidth
        }
        this.rerender()
      }
    }

  /**** minHeight ****/

    protected _minHeight:SNS_Dimension|undefined = undefined

    public get minHeight ():SNS_Dimension  {
      return (this._minHeight == null ? defaultMinHeight : this._minHeight)
    }
    public set minHeight (newMinHeight:SNS_Dimension|undefined) {
      allowDimension('minimal sticker height',newMinHeight)
      if (this._minHeight !== newMinHeight) {
        this._minHeight = newMinHeight
        this._reportChange('configure',this,'minHeight',newMinHeight)

        if (
          (this._minHeight != null) && (this._maxHeight != null) &&
          (this._maxHeight < this._minHeight)
        ) {
          this._maxHeight = newMinHeight
          this._reportChange('configure',this,'maxHeight',this._minHeight)
        }

        if ((this._minHeight != null) && (this._Geometry.Height < this._minHeight)) {
          this.Height = this._minHeight
        }
        this.rerender()
      }
    }

  /**** maxHeight ****/

    protected _maxHeight:SNS_Dimension|undefined = defaultMaxHeight

    public get maxHeight ():SNS_Dimension|undefined  { return this._maxHeight }
    public set maxHeight (newMaxHeight:SNS_Dimension|undefined) {
      allowDimension('maximal sticker height',newMaxHeight)
      if ((newMaxHeight != null) && (this._minHeight != null)) {
        newMaxHeight = Math.max(this._minHeight,newMaxHeight)
      }

      if (this._maxHeight !== newMaxHeight) {
        this._maxHeight = newMaxHeight
        this._reportChange('configure',this,'maxHeight',this._maxHeight)

        if ((this._maxHeight != null) && (this._Geometry.Height > this._maxHeight)) {
          this.Height = this._maxHeight
        }
        this.rerender()
      }
    }

  /**** x ****/

    public get x ():SNS_Location { return this._Geometry.x }
    public set x (newX:SNS_Location) {
      expectLocation('sticker x coordinate',newX)
      this.Geometry = { ...this.Geometry, x:newX }
    }

  /**** y ****/

    public get y ():SNS_Location { return this._Geometry.y }
    public set y (newY:SNS_Location) {
      expectLocation('sticker y coordinate',newY)
      this.Geometry = { ...this.Geometry, y:newY }
    }

  /**** Width ****/

    public get Width ():SNS_Dimension { return this._Geometry.Width }
    public set Width (newWidth:SNS_Dimension) {
      expectDimension('sticker width',newWidth)
      this.Geometry = { ...this.Geometry, Width:newWidth }
    }

  /**** Height ****/

    public get Height ():SNS_Dimension { return this._Geometry.Height }
    public set Height (newHeight:SNS_Dimension) {
      expectDimension('sticker height',newHeight)
      this.Geometry = { ...this.Geometry, Height:newHeight }
    }

  /**** Position ****/

    public get Position ():SNS_Position {
      return { x:this._Geometry.x, y:this._Geometry.y }
    }

    public set Position (newPosition:SNS_Position) {
      expectPosition('visual position',newPosition)
      this.Geometry = { ...this.Geometry, x:newPosition.x, y:newPosition.y }
    }

  /**** Size ****/

    public get Size ():SNS_Size {
      return { Width:this._Geometry.Width, Height:this._Geometry.Height }
    }

    public set Size (newSize:SNS_Size) {
      expectSize('visual size',newSize)
      this.Geometry = { ...this.Geometry, Width:newSize.Width, Height:newSize.Height }
    }

  /**** Geometry ****/

    protected _Geometry:SNS_Geometry = { ...defaultStickerGeometry }

    public get Geometry ():SNS_Geometry {
      let { x,y, Width,Height } = this._Geometry
        if (this._minWidth != null) { Width = Math.max(this._minWidth,Width) }
        if (this._maxWidth != null) { Width = Math.min(Width,this._maxWidth) }

        if (this._minHeight != null) { Height = Math.max(this._minHeight,Height) }
        if (this._maxHeight != null) { Height = Math.min(Height,this._maxHeight) }
      return { x,y, Width,Height }
    }

    public set Geometry (newGeometry:SNS_Geometry) {
      expectGeometry('visual geometry',newGeometry)

      let { x,y, Width,Height } = this._Geometry
      if (
        (x !== newGeometry.x) || (Width  !== newGeometry.Width) ||
        (y !== newGeometry.y) || (Height !== newGeometry.Height)
      ) {
        this._Geometry = { ...newGeometry }

        this._reportChange('configure',this,'Geometry',{ ...newGeometry })
        this.rerender()
      }
    }

  /**** Lock ****/

    protected _Lock:boolean = false

    public get Lock ():boolean { return this._Lock }
    public set Lock (newLock:boolean) {
      expectBoolean('sticker lock',newLock)
      if (this._Lock !== newLock) {
        this._Lock = newLock

        this._reportChange('configure',this,'Lock',newLock)
        this.rerender()
      }
    }

  /**** lock/unlock ****/

    public lock ():void   { this.Lock = true }
    public unlock ():void { this.Lock = false }

  /**** isLocked ****/

    public get isLocked ():boolean        { return this._Lock }
    public set isLocked (newLock:boolean) { this.Lock = newLock }

  /**** Lock ****/

    protected _Selectability:boolean = false

    public get Selectability ():boolean { return this._Selectability }
    public set Selectability (newSelectability:boolean) {
      expectBoolean('sticker selectability',newSelectability)
      if (this._Selectability !== newSelectability) {
        this._Selectability = newSelectability

        this._reportChange('configure',this,'Selectability',newSelectability)
        this.rerender()
      }
    }

  /**** isSelectable ****/

    public get isSelectable ():boolean                 { return this._Selectability }
    public set isSelectable (newSelectability:boolean) { this.Selectability = newSelectability }

  /**** Visibility ****/

    protected _Visibility:boolean = true

    public get Visibility ():boolean { return this._Visibility }
    public set Visibility (newVisibility:boolean) {
      expectBoolean('sticker visibility',newVisibility)
      if (this._Visibility !== newVisibility) {
        this._Visibility = newVisibility

        this._reportChange('configure',this,'Visibility',newVisibility)
        this.rerender()
      }
    }

  /**** show/hide ****/

    public show ():void { this.Visibility = true }
    public hide ():void { this.Visibility = false }

  /**** isVisible ****/

    public get isVisible ():boolean              { return this._Visibility }
    public set isVisible (newVisibility:boolean) { this.Visibility = newVisibility }

  /**** Enabling ****/

    protected _Enabling:boolean = true

    public get Enabling ():boolean { return this._Enabling }
    public set Enabling (newEnabling:boolean) {
      expectBoolean('sticker enabling',newEnabling)
      if (this._Enabling !== newEnabling) {
        this._Enabling = newEnabling

        this._reportChange('configure',this,'Enabling',newEnabling)
        this.rerender()
      }
    }

  /**** enable/disable ****/

    public enable ():void  { this.Enabling = true }
    public disable ():void { this.Enabling = false }

  /**** isEnabled ****/

    public get isEnabled ():boolean            { return this._Enabling }
    public set isEnabled (newEnabling:boolean) { this.Enabling = newEnabling }

  /**** onClick ****/

    protected _onClick:Function|undefined

    public onClick (newHandler:Function):void {
      expectFunction('"click" event handler',newHandler)
      this._onClick = newHandler
    }

  /**** onInput ****/

    protected _onInput:Function|undefined

    public onInput (newHandler:Function):void {
      expectFunction('"input" event handler',newHandler)
      this._onInput = newHandler
    }

  /**** onDrop ****/

    protected _onDrop:Function|undefined

    public onDrop (newHandler:Function):void {
      expectFunction('"drop" event handler',newHandler)
      this._onDrop = newHandler
    }

  /**** Rendering ****/

    public Rendering (PropSet:Indexable):any {
      if (this.hasError) {
        return ErrorRenderer.call(this)
      }

      let Renderer = this._Renderer || DefaultRenderer

      try {
        return Renderer.call(this,PropSet)
      } catch (Signal:any) {
        this.Error = {
          Type:'Rendering Failure',
          Message:''+Signal, Cause:Signal
        }
        return ErrorRenderer.call(this)
      }
    }

  /**** rerender ****/

    public rerender ():void {
      this._Project.rerender((this._Folder as SNS_Board), this)
    }

  /**** Serialization ****/

    public get Serialization ():Serializable {
      const Result:Serializable = {}
        this._serializeConfigurationInto(Result)
      return Result
    }
    public set Serialization (_:Serializable) { throwReadOnlyError('Serialization') }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      Serialization.Geometry = { ...this._Geometry }

      if (this._minWidth  != null) { Serialization.minWidth  = this._minWidth }
      if (this._maxWidth  != null) { Serialization.maxWidth  = this._maxWidth }
      if (this._minHeight != null) { Serialization.minHeight = this._minHeight }
      if (this._maxHeight != null) { Serialization.maxHeight = this._maxHeight }

      if (this.isSelectable) { Serialization.Selectability = true }
      if (this.isLocked)     { Serialization.Lock          = true }
      if (! this.isVisible)  { Serialization.Visibility    = false }
      if (! this.isEnabled)  { Serialization.Enabling      = false }
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      let { x,y, Width,Height } = Serialization.Geometry as SNS_Geometry || defaultStickerGeometry
        if (! ValueIsLocation(x)) { x = defaultStickerGeometry.x }
        if (! ValueIsLocation(y)) { y = defaultStickerGeometry.y }
        if (! ValueIsDimension(Width))  { Width  = defaultStickerGeometry.Width  }
        if (! ValueIsDimension(Height)) { Height = defaultStickerGeometry.Height }
// @ts-ignore TS2322 "x","y","Width" and "Height" will never be "null"
      this.Geometry = { x,y, Width,Height }

      if (Serialization.Selectability === true)  { this.Selectability = true }
      if (Serialization.Lock          === true)  { this.Lock          = true }
      if (Serialization.Visibility    === false) { this.Visibility    = false }
      if (Serialization.Enabling      === false) { this.Enabling      = false }
    }
  }

//------------------------------------------------------------------------------
//--                               SNS_Adapter                                --
//------------------------------------------------------------------------------

  export const SNS_ConnectionStates = ['not-ready','disconnected','connecting','connected']
  export type  SNS_ConnectionState  = typeof SNS_ConnectionStates[number]

  export abstract class SNS_Adapter {
    public abstract ConnectionState:SNS_ConnectionState
    public abstract isConnected:boolean

    public abstract connect ():void
    public abstract disconnect ():void
  }

// @ts-ignore TS2339 allow global variable "SNS"
  window.SNS = {
    SNS_FontStyles, SNS_ErrorTypes,
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
    newId,
    CSSStyleOfVisual,
    SNS_ConnectionStates
  }
console.log('SNS is globally available now')

  document.dispatchEvent(
// @ts-ignore TS2339 allow global variable "SNS"
    new CustomEvent('SNS',{ detail:window.SNS })
  )
