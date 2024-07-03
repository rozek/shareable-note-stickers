/*******************************************************************************
*                                                                              *
*                        Shareable Note Stickers (SNS)                         *
*                                                                              *
*******************************************************************************/
/**** make some existing types indexable ****/
interface Indexable {
    [Key: string]: any;
}
/**** define serializable types ****/
type serializableValue = null | boolean | number | string | serializableObject | serializableArray;
type serializableObject = {
    [Key: string]: serializableValue;
};
type serializableArray = serializableValue[];
type Serializable = serializableObject;
export type SNS_Id = string;
export type SNS_Identifier = string;
export type SNS_Name = string;
export type SNS_Ordinal = number;
export type SNS_Cardinal = number;
export type SNS_Text = string;
export type SNS_Textline = string;
export type SNS_URL = string;
export type SNS_Color = string;
/**** geometry-related types ****/
export type SNS_Location = number;
export type SNS_Dimension = number;
export type SNS_Position = {
    x: SNS_Location;
    y: SNS_Location;
};
export type SNS_Size = {
    Width: SNS_Dimension;
    Height: SNS_Dimension;
};
export type SNS_Geometry = {
    x: SNS_Location;
    y: SNS_Location;
    Width: SNS_Dimension;
    Height: SNS_Dimension;
};
/**** configuration-related types ****/
export declare const SNS_FontStyles: string[];
export type SNS_FontStyle = typeof SNS_FontStyles[number];
/**** Rendering Callback ****/
export type SNS_onRenderingCallback = (Project: SNS_Project, Board?: SNS_Board, Sticker?: SNS_Sticker) => void;
/**** Error Report ****/
export declare const SNS_ErrorTypes: string[];
export type SNS_ErrorType = typeof SNS_ErrorTypes[number];
export type SNS_Error = {
    Type: SNS_ErrorType;
    Message: SNS_Text;
    Cause: any;
};
/**** Error Callback ****/
export type SNS_onErrorCallback = (Project: SNS_Project, Visual: SNS_Visual, Error: SNS_Error) => void;
/**** throwError - simplifies construction of named errors ****/
export declare function throwError(Message: string): never;
/**** throwReadOnlyError ****/
export declare function throwReadOnlyError(Name: string): never;
/**** ValueIsVisual ****/
export declare function ValueIsVisual(Value: any): boolean;
/**** allow/expect[ed]Visual ****/
export declare const allowVisual: Function, allowedVisual: Function;
export declare const expectVisual: Function, expectedVisual: Function;
/**** ValueIsFolder ****/
export declare function ValueIsFolder(Value: any): boolean;
/**** allow/expect[ed]Folder ****/
export declare const allowFolder: Function, allowedFolder: Function;
export declare const expectFolder: Function, expectedFolder: Function;
/**** ValueIsProject ****/
export declare function ValueIsProject(Value: any): boolean;
/**** allow/expect[ed]Project ****/
export declare const allowProject: Function, allowedProject: Function;
export declare const expectProject: Function, expectedProject: Function;
/**** ValueIsBoard ****/
export declare function ValueIsBoard(Value: any): boolean;
/**** allow/expect[ed]Board ****/
export declare const allowBoard: Function, allowedBoard: Function;
export declare const expectBoard: Function, expectedBoard: Function;
/**** ValueIsSticker ****/
export declare function ValueIsSticker(Value: any): boolean;
/**** allow/expect[ed]Sticker ****/
export declare const allowSticker: Function, allowedSticker: Function;
export declare const expectSticker: Function, expectedSticker: Function;
/**** ValueIsId ****/
export declare function ValueIsId(Value: any): boolean;
/**** allow/expect[ed]Id ****/
export declare const allowId: Function, allowedId: Function;
export declare const expectId: Function, expectedId: Function;
export declare function ValueIsIdentifier(Value: any): boolean;
/**** allow/expect[ed]Identifier ****/
export declare const allowIdentifier: Function, allowedIdentifier: Function;
export declare const expectIdentifier: Function, expectedIdentifier: Function;
/**** ValueIsName ****/
export declare function ValueIsName(Value: any): boolean;
/**** allow/expect[ed]Name ****/
export declare const allowName: Function, allowedName: Function;
export declare const expectName: Function, expectedName: Function;
/**** ValueIsLocation ****/
export declare function ValueIsLocation(Value: any): boolean;
/**** allow/expect[ed]Location ****/
export declare const allowLocation: Function, allowedLocation: Function;
export declare const expectLocation: Function, expectedLocation: Function;
/**** ValueIsDimension ****/
export declare function ValueIsDimension(Value: any): boolean;
/**** allow/expect[ed]Dimension ****/
export declare const allowDimension: Function, allowedDimension: Function;
export declare const expectDimension: Function, expectedDimension: Function;
/**** ValueIsPosition ****/
export declare function ValueIsPosition(Value: any): boolean;
/**** allow/expect[ed]Position ****/
export declare const allowPosition: Function, allowedPosition: Function;
export declare const expectPosition: Function, expectedPosition: Function;
/**** ValueIsSize ****/
export declare function ValueIsSize(Value: any): boolean;
/**** allow/expect[ed]Size ****/
export declare const allowSize: Function, allowedSize: Function;
export declare const expectSize: Function, expectedSize: Function;
/**** ValueIsGeometry ****/
export declare function ValueIsGeometry(Value: any): boolean;
/**** allow/expect[ed]Geometry ****/
export declare const allowGeometry: Function, allowedGeometry: Function;
export declare const expectGeometry: Function, expectedGeometry: Function;
/**** ValueIsError ****/
export declare function ValueIsError(Value: any): boolean;
/**** allow/expect[ed]Error ****/
export declare const allowError: Function, allowedError: Function;
export declare const expectError: Function, expectedError: Function;
/**** ValueIsSerializable ****/
export declare function ValueIsSerializable(Value: any): boolean;
/**** allow/expect[ed]Serializable ****/
export declare const allowSerializable: Function, allowedSerializable: Function;
export declare const expectSerializable: Function, expectedSerializable: Function;
export declare const SNS_Changes: string[];
export type SNS_Change = typeof SNS_Changes[number];
export type SNS_onChangeCallback = (Project: SNS_Project, Change: SNS_Change, Id: SNS_Id, ...ArgList: any[]) => void;
/**** createBoard ****/
export declare function createBoard(Project: SNS_Project, BoardId: SNS_Id): void;
/**** configureFolder ****/
export declare function configureFolder(Project: SNS_Project, FolderId: SNS_Id, Property: SNS_Identifier, Value: any): void;
/**** attachBoard ****/
export declare function attachBoard(Project: SNS_Project, BoardId: SNS_Id, FolderId: SNS_Id, Index: SNS_Ordinal): void;
/**** detachBoard ****/
export declare function detachBoard(Project: SNS_Project, BoardId: SNS_Id, FolderId: SNS_Id, Index: SNS_Ordinal): void;
/**** destroyBoard ****/
export declare function destroyBoard(Project: SNS_Project, BoardId: SNS_Id): void;
/**** createSticker ****/
export declare function createSticker(Project: SNS_Project, StickerId: SNS_Id): void;
/**** configureSticker ****/
export declare function configureSticker(Project: SNS_Project, StickerId: SNS_Id, Property: SNS_Identifier, Value: any): void;
/**** attachSticker ****/
export declare function attachSticker(Project: SNS_Project, StickerId: SNS_Id, BoardId: SNS_Id, Index: SNS_Ordinal): void;
/**** detachSticker ****/
export declare function detachSticker(Project: SNS_Project, StickerId: SNS_Id, BoardId: SNS_Id, Index: SNS_Ordinal): void;
/**** destroySticker ****/
export declare function destroySticker(Project: SNS_Project, StickerId: SNS_Id): void;
/**** sanitizeBoardList ****/
export declare function sanitizeBoardList(Project: SNS_Project, Folder: SNS_Folder, Board: SNS_Board, Index?: SNS_Ordinal): void;
/**** sanitizeStickerList ****/
export declare function sanitizeStickerList(Project: SNS_Project, Board: SNS_Board, Sticker: SNS_Sticker, Index?: SNS_Ordinal): void;
/**** acceptableBoolean ****/
export declare function acceptableBoolean(Value: any, Default: boolean): boolean;
/**** acceptableOptionalBoolean ****/
export declare function acceptableOptionalBoolean(Value: any, Default?: boolean | undefined): boolean | undefined;
/**** acceptableNumber ****/
export declare function acceptableNumber(Value: any, Default: number): number;
/**** acceptableOptionalNumber ****/
export declare function acceptableOptionalNumber(Value: any, Default?: number | undefined): number | undefined;
/**** acceptableNumberInRange ****/
export declare function acceptableNumberInRange(Value: any, Default: number, minValue?: number, maxValue?: number, withMin?: boolean, withMax?: boolean): number;
/**** acceptableOptionalNumberInRange ****/
export declare function acceptableOptionalNumberInRange(Value: any, Default: number | undefined, minValue?: number, maxValue?: number, withMin?: boolean, withMax?: boolean): number | undefined;
/**** acceptableInteger ****/
export declare function acceptableInteger(Value: any, Default: number): number;
/**** acceptableOptionalInteger ****/
export declare function acceptableOptionalInteger(Value: any, Default: number | undefined): number | undefined;
/**** acceptableIntegerInRange ****/
export declare function acceptableIntegerInRange(Value: any, Default: number, minValue?: number, maxValue?: number): number;
/**** acceptableOptionalIntegerInRange ****/
export declare function acceptableOptionalIntegerInRange(Value: any, Default: number | undefined, minValue?: number, maxValue?: number): number | undefined;
/**** acceptableOrdinal ****/
export declare function acceptableOrdinal(Value: any, Default: number): number;
/**** acceptableOptionalOrdinal ****/
export declare function acceptableOptionalOrdinal(Value: any, Default?: number | undefined): number | undefined;
/**** acceptableString ****/
export declare function acceptableString(Value: any, Default: string): string;
/**** acceptableOptionalString ****/
export declare function acceptableOptionalString(Value: any, Default?: string | undefined): string | undefined;
/**** acceptableNonEmptyString ****/
export declare function acceptableNonEmptyString(Value: any, Default: string): string;
/**** acceptableOptionalNonEmptyString ****/
export declare function acceptableOptionalNonEmptyString(Value: any, Default?: string | undefined): string | undefined;
/**** acceptableStringMatching ****/
export declare function acceptableStringMatching(Value: any, Default: string, Pattern: RegExp): string;
/**** acceptableOptionalStringMatching ****/
export declare function acceptableOptionalStringMatching(Value: any, Default: string | undefined, Pattern: RegExp): string | undefined;
export declare function acceptableText(Value: any, Default: string): string;
/**** acceptableOptionalText ****/
export declare function acceptableOptionalText(Value: any, Default?: string | undefined): string | undefined;
/**** acceptableTextline ****/
export declare function acceptableTextline(Value: any, Default: string): string;
/**** acceptableOptionalTextline ****/
export declare function acceptableOptionalTextline(Value: any, Default?: string | undefined): string | undefined;
/**** acceptableFunction ****/
export declare function acceptableFunction(Value: any, Default: Function): Function;
/**** acceptableOptionalFunction ****/
export declare function acceptableOptionalFunction(Value: any, Default?: Function | undefined): Function | undefined;
/**** acceptableList ****/
export declare function acceptableList(Value: any, Default: any[]): any[];
/**** acceptableOptionalList ****/
export declare function acceptableOptionalList(Value: any, Default?: any[] | undefined): any[] | undefined;
/**** acceptableListSatisfying ****/
export declare function acceptableListSatisfying(Value: any, Default: any[], Matcher: Function): any[];
/**** acceptableOptionalListSatisfying ****/
export declare function acceptableOptionalListSatisfying(Value: any, Default: any[] | undefined, Matcher: Function): any[] | undefined;
/**** acceptableColor ****/
export declare function acceptableColor(Value: any, Default: string): string;
/**** acceptableOptionalColor ****/
export declare function acceptableOptionalColor(Value: any, Default?: string | undefined): string | undefined;
/**** acceptableEMailAddress ****/
export declare function acceptableEMailAddress(Value: any, Default: string): string;
/**** acceptablePhoneNumber ****/
export declare function acceptablePhoneNumber(Value: any, Default: string): string;
/**** acceptableURL ****/
export declare function acceptableURL(Value: any, Default: string): string;
/**** newId - uses nanoid with custom dictionary ****/
export declare const newId: (size?: number) => string;
/**** removeIdsFrom ****/
export declare function removeIdsFrom(Serialization: Serializable): void;
/**** groupedBehaviorEntryList ****/
export type SNS_groupedBehaviorEntryList = SNS_BehaviorEntryGroup[];
export type SNS_BehaviorEntryGroup = {
    GroupLabel: SNS_Textline;
    BehaviorEntryList: SNS_BehaviorEntry[];
};
export type SNS_BehaviorEntry = {
    Label: SNS_Textline;
    Name: SNS_Identifier;
    disabled: boolean;
};
export declare function groupedBehaviorEntryList(): SNS_groupedBehaviorEntryList;
/**** TemplateOfBehavior ****/
export declare function TemplateOfBehavior(BehaviorName: SNS_Identifier): Serializable;
/**** CSSStyleOfVisual ****/
export declare function CSSStyleOfVisual(Visual: SNS_Visual): string;
export declare class SNS_Visual {
    protected constructor(Project: SNS_Project, Id: SNS_Id | undefined);
    /**** Id - for internal use only ****/
    private _Id;
    get Id(): SNS_Id;
    set Id(_: SNS_Id);
    /**** Name ****/
    protected _Name: SNS_Name | undefined;
    get Name(): SNS_Name | undefined;
    set Name(newName: SNS_Name | undefined);
    /**** Project ****/
    protected _Project: SNS_Project;
    get Project(): SNS_Project;
    set Project(_: SNS_Project);
    /**** Folder ****/
    protected _Folder: SNS_Folder | undefined;
    get Folder(): SNS_Folder | undefined;
    set Folder(_: SNS_Folder | undefined);
    /**** isAttached ****/
    get isAttached(): boolean;
    set isAttached(_: boolean);
    /**** Application ****/
    get Application(): Indexable;
    set Application(_: Indexable);
    /**** BackgroundColor ****/
    protected _BackgroundColor: SNS_Color | undefined;
    get BackgroundColor(): SNS_Color | undefined;
    set BackgroundColor(newColor: SNS_Color | undefined);
    /**** BackgroundTexture ****/
    protected _BackgroundTexture: SNS_URL | undefined;
    get BackgroundTexture(): SNS_URL | undefined;
    set BackgroundTexture(newTexture: SNS_URL | undefined);
    /**** FontFamily ****/
    protected _FontFamily: SNS_Textline | undefined;
    get FontFamily(): SNS_Textline | undefined;
    set FontFamily(newFontFamily: SNS_Textline | undefined);
    /**** FontSize ****/
    protected _FontSize: SNS_Ordinal | undefined;
    get FontSize(): SNS_Ordinal | undefined;
    set FontSize(newFontSize: SNS_Ordinal | undefined);
    /**** FontWeight ****/
    protected _FontWeight: SNS_Ordinal | undefined;
    get FontWeight(): SNS_Ordinal | undefined;
    set FontWeight(newFontWeight: SNS_Ordinal | undefined);
    /**** FontStyle ****/
    protected _FontStyle: SNS_FontStyle | undefined;
    get FontStyle(): SNS_FontStyle | undefined;
    set FontStyle(newFontStyle: SNS_FontStyle | undefined);
    /**** LineHeight ****/
    protected _LineHeight: SNS_Ordinal | undefined;
    get LineHeight(): SNS_Ordinal | undefined;
    set LineHeight(newLineHeight: SNS_Ordinal | undefined);
    /**** ForegroundColor ****/
    protected _ForegroundColor: SNS_Color | undefined;
    get ForegroundColor(): SNS_Color | undefined;
    set ForegroundColor(newForegroundColor: SNS_Color | undefined);
    /**** Color ****/
    get Color(): SNS_Color | undefined;
    set Color(newColor: SNS_Color | undefined);
    /**** Value ****/
    protected _Value: serializableValue;
    get Value(): serializableValue;
    set Value(newValue: serializableValue);
    /**** editableValue (may be overwritten) ****/
    get editableValue(): SNS_Text;
    set editableValue(newValue: SNS_Text);
    /**** observed ****/
    protected _observed: Indexable;
    get observed(): Indexable;
    set observed(_: Indexable);
    /**** unobserved ****/
    protected _unobserved: Indexable;
    get unobserved(): Indexable;
    set unobserved(_: Indexable);
    /**** memoized ****/
    protected _memoized: Indexable;
    get memoized(): Indexable;
    set memoized(_: Indexable);
    /**** Script ****/
    get Script(): SNS_Text | undefined;
    set Script(_: SNS_Text | undefined);
    /**** activeScript ****/
    protected _activeScript: SNS_Text | undefined;
    get activeScript(): SNS_Text | undefined;
    set activeScript(newScript: SNS_Text | undefined);
    /**** pendingScript ****/
    protected _pendingScript: SNS_Text | undefined;
    get pendingScript(): SNS_Text | undefined;
    set pendingScript(newScript: SNS_Text | undefined);
    /**** activateScript ****/
    activateScript(): void;
    /**** ScriptError - for internal use only ****/
    protected _ScriptError: SNS_Error | undefined;
    get ScriptError(): SNS_Error | undefined;
    set ScriptError(newScriptError: SNS_Error | undefined);
    /**** CSSStyle ****/
    get CSSStyle(): string;
    set CSSStyle(_: string);
    /**** Renderer ****/
    protected _Renderer: Function | undefined;
    get Renderer(): Function | undefined;
    set Renderer(newRenderer: Function | undefined);
    /**** onRender ****/
    onRender(newRenderer: Function): void;
    /**** Rendering ****/
    Rendering(PropSet: Indexable): any;
    /**** rerender (to be overwritten) ****/
    rerender(Board?: SNS_Board, Sticker?: SNS_Sticker): void;
    /**** View ****/
    private _View;
    get View(): HTMLElement | undefined;
    set View(_: HTMLElement);
    /**** isMounted ****/
    get isMounted(): boolean;
    set isMounted(_: boolean);
    /**** onMount ****/
    protected _onMount: Function | undefined;
    onMount(newCallback: Function | undefined): void;
    /**** onUnmount ****/
    protected _onUnmount: Function | undefined;
    onUnmount(newCallback: Function | undefined): void;
    /**** Error - for internal use only ****/
    protected _Error: SNS_Error | undefined;
    get Error(): SNS_Error | undefined;
    set Error(newError: SNS_Error | undefined);
    /**** hasError ****/
    get hasError(): boolean;
    set hasError(_: boolean);
    /**** _reportChange ****/
    _reportChange(Change: SNS_Change | 'configure', ...ArgList: any[]): void;
    /**** _serializeConfigurationInto ****/
    protected _serializeConfigurationInto(Serialization: Serializable): void;
    /**** _deserializeConfigurationFrom ****/
    protected _deserializeConfigurationFrom(Serialization: Serializable): void;
}
export declare class SNS_Folder extends SNS_Visual {
    protected constructor(Project: SNS_Project, Id: SNS_Id | undefined);
    /**** Path ****/
    get Path(): SNS_Textline;
    set Path(_: SNS_Textline);
    /**** BoardAtPath ****/
    BoardAtPath(Path: SNS_Textline): SNS_Board | undefined;
    /**** IndexPath ****/
    get IndexPath(): SNS_Ordinal[];
    set IndexPath(_: SNS_Ordinal[]);
    /**** SnapToGrid - inherited from outer folders ****/
    protected _SnapToGrid: boolean | undefined;
    get SnapToGrid(): boolean;
    set SnapToGrid(newSetting: boolean | undefined);
    /**** GridWidth ****/
    protected _GridWidth: SNS_Cardinal | undefined;
    get GridWidth(): SNS_Cardinal;
    set GridWidth(newWidth: SNS_Cardinal | undefined);
    /**** GridHeight ****/
    protected _GridHeight: SNS_Cardinal | undefined;
    get GridHeight(): SNS_Cardinal;
    set GridHeight(newHeight: SNS_Cardinal | undefined);
    /**** Index ****/
    get Index(): number;
    set Index(_: number);
    /**** mayBeShiftedUp ****/
    get mayBeShiftedUp(): boolean;
    set mayBeShiftedUp(_: boolean);
    /**** mayBeShiftedDown ****/
    get mayBeShiftedDown(): boolean;
    set mayBeShiftedDown(_: boolean);
    /**** mayBeShiftedIn ****/
    get mayBeShiftedIn(): boolean;
    set mayBeShiftedIn(_: boolean);
    /**** mayBeShiftedOut ****/
    get mayBeShiftedOut(): boolean;
    set mayBeShiftedOut(_: boolean);
    /**** containsFolder ****/
    containsFolder(Folder: SNS_Folder): boolean;
    /**** BoardList ****/
    protected _BoardList: SNS_Board[];
    get BoardList(): SNS_Board[];
    set BoardList(_: SNS_Board[]);
    /**** BoardCount ****/
    get BoardCount(): number;
    set BoardCount(_: number);
    /**** IndexOfBoard ****/
    IndexOfBoard(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): number;
    /**** Board ****/
    Board(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): SNS_Board | undefined;
    /**** existingBoard ****/
    existingBoard(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): SNS_Board;
    /**** BoardNamed ****/
    BoardNamed(Name: SNS_Name): SNS_Board | undefined;
    /**** BoardAt ****/
    BoardAt(Index: number): SNS_Board | undefined;
    /**** hasBoard ****/
    hasBoard(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): boolean;
    /**** newBoardAt ****/
    newBoardAt(Index?: number, Id?: SNS_Id): SNS_Board;
    /**** BoardDeserializedAt - nota bene: needs explicit script activation! ****/
    BoardDeserializedAt(Serialization: Serializable, Index?: number): SNS_Board;
    /**** DuplicateOfBoardAt ****/
    DuplicateOfBoardAt(Index: number): SNS_Board;
    /**** mayShiftBoardUp/Down ****/
    mayShiftBoardUp(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): boolean;
    mayShiftBoardDown(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): boolean;
    /**** shiftBoardToTop ****/
    shiftBoardToTop(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): void;
    /**** shiftBoardUp ****/
    shiftBoardUp(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): void;
    /**** shiftBoardDown ****/
    shiftBoardDown(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): void;
    /**** shiftBoardToBottom ****/
    shiftBoardToBottom(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): void;
    /**** shiftBoardTo ****/
    shiftBoardTo(BoardOrNameOrIndex: SNS_Board | SNS_Name | number, newIndex: number): void;
    /**** shiftBoardsByIndex ****/
    shiftBoardsByIndex(oldIndex: number, newIndex: number, Count: number): void;
    /**** mayShiftBoardIn/Out ****/
    mayShiftBoardIn(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): boolean;
    mayShiftBoardOut(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): boolean;
    /**** shiftBoardIn ****/
    shiftBoardIn(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): void;
    /**** shiftBoardOut ****/
    shiftBoardOut(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): void;
    /**** mayMoveBoardTo ****/
    mayMoveBoardTo(BoardOrNameOrIndex: SNS_Board | SNS_Name | number, FolderOrNameOrIndex: SNS_Folder | SNS_Name | number, Index?: number): boolean;
    /**** moveBoardTo ****/
    moveBoardTo(BoardOrNameOrIndex: SNS_Board | SNS_Name | number, FolderOrNameOrIndex: SNS_Folder | SNS_Name | number, Index?: number): void;
    /**** destroyBoard ****/
    destroyBoard(BoardOrNameOrIndex: SNS_Board | SNS_Name | number): void;
    /**** clear ****/
    clear(): void;
    /**** _attachBoardAt ****/
    _attachBoardAt(Board: SNS_Board, Index: number): void;
    /**** _detachBoardAt ****/
    _detachBoardAt(Index: number): void;
    /**** _serializeConfigurationInto ****/
    protected _serializeConfigurationInto(Serialization: Serializable): void;
    /**** _deserializeConfigurationFrom ****/
    protected _deserializeConfigurationFrom(Serialization: Serializable): void;
    /**** _serializeBoardsInto ****/
    protected _serializeBoardsInto(Serialization: Serializable): void;
    /**** _deserializeBoardsFrom ****/
    protected _deserializeBoardsFrom(Serialization: Serializable): void;
}
export declare class SNS_Project extends SNS_Folder {
    protected constructor(Name: SNS_Name);
    /**** Name ****/
    get Name(): SNS_Name | undefined;
    set Name(_: SNS_Name | undefined);
    /**** IndexPath ****/
    get IndexPath(): SNS_Ordinal[];
    set IndexPath(_: SNS_Ordinal[]);
    /**** BoardAtIndexPath ****/
    BoardAtIndexPath(IndexPath: SNS_Ordinal[]): SNS_Board | undefined;
    /**** FolderWithId ****/
    FolderWithId(Id: SNS_Id): SNS_Folder | undefined;
    /**** BoardWithId ****/
    BoardWithId(Id: SNS_Id): SNS_Board | undefined;
    /**** StickerWithId ****/
    StickerWithId(Id: SNS_Id): SNS_Sticker | undefined;
    /**** recursivelyActivateAllScripts ****/
    recursivelyActivateAllScripts(): void;
    /**** onChange ****/
    protected _onChange: SNS_onChangeCallback[];
    onChange(Callback: SNS_onChangeCallback): void;
    /**** _reportChange ****/
    _reportChange(Change: SNS_Change | 'configure', Visual: SNS_Visual, ...ArgList: any[]): void;
    /**** onRendering ****/
    protected _onRendering: SNS_onRenderingCallback[];
    onRendering(Callback: SNS_onRenderingCallback): void;
    /**** rerender - warning: semantics differs from that of other visuals ****/
    rerender(Board?: SNS_Board, Sticker?: SNS_Sticker): void;
    /**** onError ****/
    protected _onError: SNS_onErrorCallback[];
    onError(Callback: SNS_onErrorCallback): void;
    /**** showError ****/
    showError(Visual: SNS_Visual, Error: SNS_Error): void;
    /**** Application ****/
    private _Application;
    get Application(): Indexable;
    set Application(newInterface: Indexable);
    /**** Serialization ****/
    get Serialization(): Serializable;
    set Serialization(_: Serializable);
    /**** deserializedFrom - nota bene: needs explicit script activation! ****/
    static deserializedFrom(Name: SNS_Name, Serialization: Serializable): SNS_Project;
}
export declare class SNS_Board extends SNS_Folder {
    constructor(Project: SNS_Project, Id: SNS_Id | undefined);
    /**** StickerList ****/
    protected _StickerList: SNS_Sticker[];
    get StickerList(): SNS_Sticker[];
    set StickerList(_: SNS_Sticker[]);
    /**** StickerCount ****/
    get StickerCount(): number;
    set StickerCount(_: number);
    /**** IndexOfSticker ****/
    IndexOfSticker(Sticker: SNS_Sticker): number;
    /**** Sticker ****/
    Sticker(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number): SNS_Sticker | undefined;
    /**** existingSticker ****/
    existingSticker(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number): SNS_Sticker;
    /**** StickerNamed ****/
    StickerNamed(Name: SNS_Name): SNS_Sticker | undefined;
    /**** StickerAt ****/
    StickerAt(Index: number): SNS_Sticker | undefined;
    /**** hasSticker ****/
    hasSticker(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number): boolean;
    /**** newStickerAt ****/
    newStickerAt(Index?: number, Id?: SNS_Id): SNS_Sticker;
    /**** StickerDeserializedAt - nota bene: needs explicit script activation! ****/
    StickerDeserializedAt(Serialization: Serializable, Index?: number): SNS_Sticker;
    /**** DuplicateOfStickerAt ****/
    DuplicateOfStickerAt(Index: number): SNS_Sticker;
    /**** mayShiftStickerUp/Down ****/
    mayShiftStickerUp(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number): boolean;
    mayShiftStickerDown(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number): boolean;
    /**** shiftStickerToTop ****/
    shiftStickerToTop(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number): void;
    /**** shiftStickerUp ****/
    shiftStickerUp(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number): void;
    /**** shiftStickerDown ****/
    shiftStickerDown(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number): void;
    /**** shiftStickerToBottom ****/
    shiftStickerToBottom(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number): void;
    /**** shiftStickerTo ****/
    shiftStickerTo(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number, newIndex: number): void;
    /**** shiftStickersByIndex ****/
    shiftStickersByIndex(oldIndex: number, newIndex: number, Count: number): void;
    /**** destroySticker ****/
    destroySticker(StickerOrNameOrIndex: SNS_Sticker | SNS_Name | number): void;
    /**** clear ****/
    clear(): void;
    /**** recursivelyActivateAllScripts ****/
    recursivelyActivateAllScripts(): void;
    /**** Rendering ****/
    Rendering(PropSet: Indexable): any;
    /**** rerender ****/
    rerender(): void;
    /**** onClick ****/
    protected _onClick: Function | undefined;
    onClick(newHandler: Function): void;
    /**** onDrop ****/
    protected _onDrop: Function | undefined;
    onDrop(newHandler: Function): void;
    /**** _attachStickerAt ****/
    _attachStickerAt(Sticker: SNS_Sticker, Index: number): void;
    /**** _detachStickerAt ****/
    _detachStickerAt(Index: number): void;
    /**** Serialization ****/
    get Serialization(): Serializable;
    set Serialization(_: Serializable);
    /**** _serializeStickersInto ****/
    protected _serializeStickersInto(Serialization: Serializable): void;
    /**** _deserializeStickersFrom ****/
    protected _deserializeStickersFrom(Serialization: Serializable): void;
}
export declare class SNS_Sticker extends SNS_Visual {
    constructor(Project: SNS_Project, Id: SNS_Id | undefined);
    /**** Board ****/
    get Board(): SNS_Board;
    set Board(_: SNS_Board);
    /**** BackgroundColor ****/
    get BackgroundColor(): SNS_Color | undefined;
    set BackgroundColor(newColor: SNS_Color | undefined);
    /**** BackgroundTexture ****/
    get BackgroundTexture(): SNS_URL | undefined;
    set BackgroundTexture(newTexture: SNS_URL | undefined);
    /**** Index ****/
    get Index(): number;
    set Index(_: number);
    /**** mayBeShiftedUp ****/
    get mayBeShiftedUp(): boolean;
    set mayBeShiftedUp(_: boolean);
    /**** mayBeShiftedDown ****/
    get mayBeShiftedDown(): boolean;
    set mayBeShiftedDown(_: boolean);
    /**** minWidth ****/
    protected _minWidth: SNS_Dimension | undefined;
    get minWidth(): SNS_Dimension;
    set minWidth(newMinWidth: SNS_Dimension | undefined);
    /**** maxWidth ****/
    protected _maxWidth: SNS_Dimension | undefined;
    get maxWidth(): SNS_Dimension | undefined;
    set maxWidth(newMaxWidth: SNS_Dimension | undefined);
    /**** minHeight ****/
    protected _minHeight: SNS_Dimension | undefined;
    get minHeight(): SNS_Dimension;
    set minHeight(newMinHeight: SNS_Dimension | undefined);
    /**** maxHeight ****/
    protected _maxHeight: SNS_Dimension | undefined;
    get maxHeight(): SNS_Dimension | undefined;
    set maxHeight(newMaxHeight: SNS_Dimension | undefined);
    /**** x ****/
    get x(): SNS_Location;
    set x(newX: SNS_Location);
    /**** y ****/
    get y(): SNS_Location;
    set y(newY: SNS_Location);
    /**** Width ****/
    get Width(): SNS_Dimension;
    set Width(newWidth: SNS_Dimension);
    /**** Height ****/
    get Height(): SNS_Dimension;
    set Height(newHeight: SNS_Dimension);
    /**** Position ****/
    get Position(): SNS_Position;
    set Position(newPosition: SNS_Position);
    /**** Size ****/
    get Size(): SNS_Size;
    set Size(newSize: SNS_Size);
    /**** Geometry ****/
    protected _Geometry: SNS_Geometry;
    get Geometry(): SNS_Geometry;
    set Geometry(newGeometry: SNS_Geometry);
    /**** Lock ****/
    protected _Lock: boolean;
    get Lock(): boolean;
    set Lock(newLock: boolean);
    /**** lock/unlock ****/
    lock(): void;
    unlock(): void;
    /**** isLocked ****/
    get isLocked(): boolean;
    set isLocked(newLock: boolean);
    /**** Lock ****/
    protected _Selectability: boolean;
    get Selectability(): boolean;
    set Selectability(newSelectability: boolean);
    /**** isSelectable ****/
    get isSelectable(): boolean;
    set isSelectable(newSelectability: boolean);
    /**** Visibility ****/
    protected _Visibility: boolean;
    get Visibility(): boolean;
    set Visibility(newVisibility: boolean);
    /**** show/hide ****/
    show(): void;
    hide(): void;
    /**** isVisible ****/
    get isVisible(): boolean;
    set isVisible(newVisibility: boolean);
    /**** Enabling ****/
    protected _Enabling: boolean;
    get Enabling(): boolean;
    set Enabling(newEnabling: boolean);
    /**** enable/disable ****/
    enable(): void;
    disable(): void;
    /**** isEnabled ****/
    get isEnabled(): boolean;
    set isEnabled(newEnabling: boolean);
    /**** onClick ****/
    protected _onClick: Function | undefined;
    onClick(newHandler: Function): void;
    /**** onInput ****/
    protected _onInput: Function | undefined;
    onInput(newHandler: Function): void;
    /**** onDrop ****/
    protected _onDrop: Function | undefined;
    onDrop(newHandler: Function): void;
    /**** Rendering ****/
    Rendering(PropSet: Indexable): any;
    /**** rerender ****/
    rerender(): void;
    /**** Serialization ****/
    get Serialization(): Serializable;
    set Serialization(_: Serializable);
    /**** _serializeConfigurationInto ****/
    protected _serializeConfigurationInto(Serialization: Serializable): void;
    /**** _deserializeConfigurationFrom ****/
    protected _deserializeConfigurationFrom(Serialization: Serializable): void;
}
export declare const SNS_ConnectionStates: string[];
export type SNS_ConnectionState = typeof SNS_ConnectionStates[number];
export declare abstract class SNS_Adapter {
    abstract ConnectionState: SNS_ConnectionState;
    abstract isConnected: boolean;
    abstract connect(): void;
    abstract disconnect(): void;
}
export {};
