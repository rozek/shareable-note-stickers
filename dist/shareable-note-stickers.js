var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { ValidatorForClassifier, acceptNil, rejectNil, quoted, ValueIsTextline, ValueIsStringMatching, ValueIsFiniteNumber, ValueIsObject, ValueIsPlainObject, ValueIsOneOf, ValueIsText, expectOrdinal, allowOrdinal, ValueIsBoolean, ValueIsNumber, ValueIsNumberInRange, ValueIsInteger, ValueIsIntegerInRange, ValueIsOrdinal, ValueIsString, ValueIsFunction, ValueIsList, ValueIsListSatisfying, ValueIsColor, ValueIsEMailAddress, ValueIsURL, expectTextline, allowPlainObject, allowFunction, allowColor, allowURL, allowTextline, allowIntegerInRange, allowOneOf, ValuesDiffer as ValuesDiffer$1, allowText, allowBoolean, allowCardinal, expectValue, expectInteger, allowInteger, expectIntegerInRange, expectListSatisfying, expectFunction, expectBoolean } from "javascript-interface-library";
import { h } from "preact";
import e from "htm";
import { customAlphabet } from "nanoid";
import { nolookalikesSafe } from "nanoid-dictionary";
var m = e.bind(h);
const BIND_IGNORED = [
  "String",
  "Number",
  "Object",
  "Array",
  "Boolean",
  "Date"
];
function isObj(object) {
  return object && typeof object === "object";
}
function setHiddenKey(object, key, value) {
  Object.defineProperty(object, key, { value, enumerable: false, configurable: true });
}
function defineBubblingProperties(object, key, parent) {
  setHiddenKey(object, "__key", key);
  setHiddenKey(object, "__parent", parent);
}
function getInstanceMethodKeys(object) {
  return Object.getOwnPropertyNames(object).concat(
    Object.getPrototypeOf(object) && BIND_IGNORED.indexOf(Object.getPrototypeOf(object).constructor.name) < 0 ? Object.getOwnPropertyNames(Object.getPrototypeOf(object)) : []
  ).filter((prop) => prop !== "constructor" && typeof object[prop] === "function");
}
const data = {
  computedStack: [],
  trackerSymbol: Symbol("tracker")
};
let queue = null;
const __batched = Symbol();
function process() {
  if (!queue)
    return;
  for (const task of queue) {
    task();
    task[__batched] = false;
  }
  queue = null;
}
function enqueue(task, batch) {
  if (task[__batched])
    return;
  if (queue === null) {
    queue = [];
    if (batch === true) {
      queueMicrotask(process);
    } else {
      setTimeout(process, batch);
    }
  }
  queue.push(task);
}
const { computedStack: computedStack$1, trackerSymbol: trackerSymbol$1 } = data;
const observedSymbol = Symbol("__observed");
const modifiedProperty = Symbol("modifiedProperty");
function observe$1(obj, options = {}) {
  const {
    props,
    ignore,
    batch,
    deep = true,
    bubble,
    bind
  } = options;
  if (obj[observedSymbol]) {
    return obj;
  }
  const isWatched = (prop) => prop !== observedSymbol && (props == null || props instanceof Array && props.includes(prop)) && (ignore == null || ignore instanceof Array && !ignore.includes(prop));
  if (deep) {
    Object.entries(obj).forEach(function([key, val]) {
      if (isObj(val) && isWatched(key)) {
        obj[key] = observe$1(val, options);
        if (bubble) {
          defineBubblingProperties(obj[key], key, obj);
        }
      }
    });
  }
  function setObjectPropertyTo(obj2, prop, value) {
    if (prop === "__handler") {
      setHiddenKey(obj2, "__handler", value);
    } else if (!isWatched(prop)) {
      obj2[prop] = value;
    } else if (Array.isArray(obj2) && prop === "length" || ValuesDiffer(obj2[prop], value)) {
      const deeper = prop !== modifiedProperty && deep && isObj(value);
      const oldValue = obj2[prop];
      obj2[prop] = deeper ? observe$1(value, options) : value;
      if (deeper && bubble) {
        defineBubblingProperties(obj2[prop], prop, obj2);
      }
      const ancestry = [prop];
      let parent = obj2;
      while (parent) {
        if (parent.__handler && parent.__handler(ancestry, value, oldValue, proxy) === false) {
          break;
        }
        if (parent.__key && parent.__parent) {
          ancestry.unshift(parent.__key);
          parent = parent.__parent;
        } else {
          parent = null;
        }
      }
      const dependents = propertiesMap.get(prop);
      if (dependents) {
        for (const dependent of dependents) {
          const tracker = dependent[trackerSymbol$1];
          const trackedObj = tracker && tracker.get(obj2);
          const tracked = trackedObj && trackedObj.has(prop);
          if (dependent.__disposed || tracker && !tracked) {
            dependents.delete(dependent);
          } else if (dependent !== computedStack$1[0]) {
            if (typeof batch !== "undefined" && batch !== false) {
              enqueue(dependent, batch);
              dependent[__batched] = true;
            } else {
              dependent();
            }
          }
        }
      }
      if (prop !== modifiedProperty) {
        obj2[modifiedProperty] = prop;
        const dependents2 = propertiesMap.get(modifiedProperty);
        if (dependents2) {
          for (const dependent of dependents2) {
            const tracker = dependent[trackerSymbol$1];
            const trackedObj = tracker && tracker.get(obj2);
            const tracked = trackedObj && trackedObj.has(modifiedProperty);
            if (dependent.__disposed || tracker && !tracked) {
              dependents2.delete(dependent);
            } else if (dependent !== computedStack$1[0]) {
              if (typeof batch !== "undefined" && batch !== false) {
                enqueue(dependent, batch);
                dependent[__batched] = true;
              } else {
                dependent();
              }
            }
          }
        }
      }
    }
  }
  const propertiesMap = /* @__PURE__ */ new Map();
  const proxy = new Proxy(obj, {
    get(_, prop) {
      if (prop === observedSymbol)
        return true;
      if (isWatched(prop)) {
        if (computedStack$1.length) {
          const computedFn = computedStack$1[0];
          const tracker = computedFn[trackerSymbol$1];
          if (tracker) {
            let trackerSet = tracker.get(obj);
            if (!trackerSet) {
              trackerSet = /* @__PURE__ */ new Set();
              tracker.set(obj, trackerSet);
            }
            trackerSet.add(prop);
          }
          let propertiesSet = propertiesMap.get(prop);
          if (!propertiesSet) {
            propertiesSet = /* @__PURE__ */ new Set();
            propertiesMap.set(prop, propertiesSet);
          }
          propertiesSet.add(computedFn);
        }
      }
      return obj[prop];
    },
    set(_, prop, value) {
      setObjectPropertyTo(obj, prop, value);
      return true;
    },
    defineProperty(_, prop, descriptor) {
      if (prop === "__handler") {
        throw new Error("Don't track bubble handlers");
      } else if (!isWatched(prop)) {
        return Reflect.defineProperty(obj, prop, descriptor);
      } else if (!Array.isArray(obj) || prop === "length") {
        if ("value" in descriptor && deep && isObj(descriptor.value)) {
          descriptor = { ...descriptor };
          descriptor.value = observe$1(descriptor.value, options);
        }
        const Outcome = Reflect.defineProperty(obj, prop, descriptor);
        if (prop !== modifiedProperty) {
          obj[modifiedProperty] = prop;
        }
        return Outcome;
      }
      return false;
    },
    deleteProperty(_, prop) {
      if (prop === modifiedProperty)
        throw new Error(
          'internal property Symbol("modifiedProperty") must not be deleted'
        );
      if (prop in obj) {
        setObjectPropertyTo(obj, prop, void 0);
      }
      return Reflect.deleteProperty(_, prop);
    }
  });
  if (bind) {
    getInstanceMethodKeys(obj).forEach((key) => obj[key] = obj[key].bind(proxy));
  }
  return proxy;
}
function ValuesDiffer(thisValue, otherValue, Mode) {
  const visitedObjects = /* @__PURE__ */ new Map();
  function ValuesDoDiffer(thisValue2, otherValue2, Mode2) {
    if (thisValue2 === otherValue2) {
      return false;
    }
    let thisType = typeof thisValue2;
    if (thisType !== typeof otherValue2) {
      return true;
    }
    function ArraysDiffer(thisArray, otherArray, Mode3) {
      if (!Array.isArray(otherArray)) {
        return true;
      }
      if (thisArray.length !== otherArray.length) {
        return true;
      }
      if (visitedObjects.has(thisArray) || visitedObjects.has(otherArray)) {
        if (visitedObjects.has(thisArray) && visitedObjects.get(thisArray).has(otherArray)) {
          return false;
        }
        if (visitedObjects.has(otherArray) && visitedObjects.get(otherArray).has(thisArray)) {
          return false;
        }
        if (!visitedObjects.has(thisArray)) {
          visitedObjects.set(thisArray, /* @__PURE__ */ new Set());
        }
        visitedObjects.get(thisArray).add(otherArray);
      }
      for (let i = 0, l = thisArray.length; i < l; i++) {
        if (ValuesDoDiffer(thisArray[i], otherArray[i], Mode3)) {
          return true;
        }
      }
      return false;
    }
    function ObjectsDiffer(thisObject, otherObject, Mode3 = "by-value") {
      if (Object.getPrototypeOf(thisObject) !== Object.getPrototypeOf(otherObject)) {
        return true;
      }
      for (let key in thisObject) {
        if (!(key in otherObject)) {
          return true;
        }
      }
      for (let key in otherObject) {
        if (!(key in thisObject)) {
          return true;
        }
      }
      if (visitedObjects.has(thisObject) || visitedObjects.has(otherObject)) {
        if (visitedObjects.has(thisObject) && visitedObjects.get(thisObject).has(otherObject)) {
          return false;
        }
        if (visitedObjects.has(otherObject) && visitedObjects.get(otherObject).has(thisObject)) {
          return false;
        }
        if (!visitedObjects.has(thisObject)) {
          visitedObjects.set(thisObject, /* @__PURE__ */ new Set());
        }
        visitedObjects.get(thisObject).add(otherObject);
      }
      for (let key in thisObject) {
        if (ValuesDoDiffer(thisObject[key], otherObject[key], Mode3)) {
          return true;
        }
      }
      return false;
    }
    switch (thisType) {
      case "undefined":
      case "boolean":
      case "string":
      case "function":
        return true;
      case "number":
        return isNaN(thisValue2) !== isNaN(otherValue2) || Math.abs(thisValue2 - otherValue2) > Number.EPSILON;
      case "object":
        if (thisValue2 == null) {
          return true;
        }
        if (otherValue2 == null) {
          return true;
        }
        if (Mode2 === "by-value" && (thisValue2 instanceof Boolean || thisValue2 instanceof Number || thisValue2 instanceof String)) {
          return thisValue2.valueOf() !== otherValue2.valueOf();
        }
        if (Array.isArray(thisValue2)) {
          return ArraysDiffer(thisValue2, otherValue2, Mode2);
        }
        return Mode2 === "by-reference" ? true : ObjectsDiffer(thisValue2, otherValue2, Mode2);
      default:
        return true;
    }
    return true;
  }
  return ValuesDoDiffer(thisValue, otherValue, Mode);
}
const { computedStack, trackerSymbol } = data;
function computed$1(wrappedFunction, { autoRun = true, callback, bind, disableTracking = false } = {}) {
  function observeComputation(fun, argsList = []) {
    const target = callback || wrapper;
    if (!disableTracking) {
      target[trackerSymbol] = /* @__PURE__ */ new WeakMap();
    }
    computedStack.unshift(target);
    if (argsList.length > 0) {
      argsList = [...argsList, computeAsyncArg];
    } else {
      argsList = [computeAsyncArg];
    }
    const result = fun ? fun() : bind ? wrappedFunction.apply(bind, argsList) : wrappedFunction(...argsList);
    computedStack.shift();
    return result;
  }
  const computeAsyncArg = { computeAsync: observeComputation };
  const wrapper = (...argsList) => observeComputation(null, argsList);
  if (autoRun) {
    wrapper();
  }
  return wrapper;
}
function dispose$1(computedFunction) {
  computedFunction[data.trackerSymbol] = null;
  return computedFunction.__disposed = true;
}
const hyperactiv = {
  observe: observe$1,
  modifiedProperty,
  computed: computed$1,
  dispose: dispose$1,
  batch: process
};
const ValueIsPhoneNumber = ValueIsTextline;
const { observe, computed, dispose } = hyperactiv;
const BehaviorStyleElement = document.createElement("style");
BehaviorStyleElement.innerHTML = `
/**** DefaultSticker ****/

  .SNS.DefaultSticker {
    left:0px; top:0px; right:0px; bottom:0px;
  }
`;
document.head.appendChild(BehaviorStyleElement);
const SNS_FontStyles = ["normal", "italic"];
const SNS_ErrorTypes = [
  "missing Behaviour",
  "Behaviour Execution Failure",
  "Script Compilation Failure",
  "Script Execution Failure",
  "Rendering Failure",
  "Event Handling Failure",
  '"onMount" Callback Failure',
  '"onUnmount" Callback Failure'
];
function throwError(Message) {
  let Match = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(Message);
  if (Match == null) {
    throw new Error(Message);
  } else {
    let namedError = new Error(Match[2]);
    namedError.name = Match[1];
    throw namedError;
  }
}
function throwReadOnlyError(Name) {
  throwError(
    "ReadOnlyProperty: property " + quoted(Name) + " must not be set"
  );
}
function ValueIsVisual(Value) {
  return Value instanceof SNS_Visual;
}
const allowVisual = ValidatorForClassifier(
  ValueIsVisual,
  acceptNil,
  "SNS visual"
), allowedVisual = allowVisual;
const expectVisual = ValidatorForClassifier(
  ValueIsVisual,
  rejectNil,
  "SNS visual"
), expectedVisual = expectVisual;
function ValueIsFolder(Value) {
  return Value instanceof SNS_Folder;
}
const allowFolder = ValidatorForClassifier(
  ValueIsFolder,
  acceptNil,
  "SNS folder"
), allowedFolder = allowFolder;
const expectFolder = ValidatorForClassifier(
  ValueIsFolder,
  rejectNil,
  "SNS folder"
), expectedFolder = expectFolder;
function ValueIsProject(Value) {
  return Value instanceof SNS_Project;
}
const allowProject = ValidatorForClassifier(
  ValueIsProject,
  acceptNil,
  "SNS project"
), allowedProject = allowProject;
const expectProject = ValidatorForClassifier(
  ValueIsProject,
  rejectNil,
  "SNS project"
), expectedProject = expectProject;
function ValueIsBoard(Value) {
  return Value instanceof SNS_Board;
}
const allowBoard = ValidatorForClassifier(
  ValueIsBoard,
  acceptNil,
  "SNS board"
), allowedBoard = allowBoard;
const expectBoard = ValidatorForClassifier(
  ValueIsBoard,
  rejectNil,
  "SNS board"
), expectedBoard = expectBoard;
function ValueIsSticker(Value) {
  return Value instanceof SNS_Sticker;
}
const allowSticker = ValidatorForClassifier(
  ValueIsSticker,
  acceptNil,
  "SNS sticker"
), allowedSticker = allowSticker;
const expectSticker = ValidatorForClassifier(
  ValueIsSticker,
  rejectNil,
  "SNS sticker"
), expectedSticker = expectSticker;
function ValueIsId(Value) {
  return ValueIsTextline(Value);
}
const allowId = ValidatorForClassifier(
  ValueIsId,
  acceptNil,
  "unique SNS id"
), allowedId = allowId;
const expectId = ValidatorForClassifier(
  ValueIsId,
  rejectNil,
  "unique SNS id"
), expectedId = expectId;
const SNS_IdentifierPattern = /^[a-z$_][a-z$_0-9]*$/i;
function ValueIsIdentifier(Value) {
  return ValueIsStringMatching(Value, SNS_IdentifierPattern);
}
const allowIdentifier = ValidatorForClassifier(
  ValueIsIdentifier,
  acceptNil,
  "note stickers identifier"
), allowedIdentifier = allowIdentifier;
const expectIdentifier = ValidatorForClassifier(
  ValueIsIdentifier,
  rejectNil,
  "note stickers identifier"
), expectedIdentifier = expectIdentifier;
function ValueIsName(Value) {
  return ValueIsTextline(Value);
}
const allowName = ValidatorForClassifier(
  ValueIsName,
  acceptNil,
  "SNS name"
), allowedName = allowName;
const expectName = ValidatorForClassifier(
  ValueIsName,
  rejectNil,
  "SNS name"
), expectedName = expectName;
function ValueIsLocation(Value) {
  return ValueIsFiniteNumber(Value);
}
const allowLocation = ValidatorForClassifier(
  ValueIsLocation,
  acceptNil,
  "sticker coordinate"
), allowedLocation = allowLocation;
const expectLocation = ValidatorForClassifier(
  ValueIsLocation,
  rejectNil,
  "sticker coordinate"
), expectedLocation = expectLocation;
function ValueIsDimension(Value) {
  return ValueIsFiniteNumber(Value) && Value >= 0;
}
const allowDimension = ValidatorForClassifier(
  ValueIsDimension,
  acceptNil,
  "sticker dimension"
), allowedDimension = allowDimension;
const expectDimension = ValidatorForClassifier(
  ValueIsDimension,
  rejectNil,
  "sticker dimension"
), expectedDimension = expectDimension;
function ValueIsPosition(Value) {
  return ValueIsObject(Value) && ValueIsLocation(Value.x) && ValueIsLocation(Value.y);
}
const allowPosition = ValidatorForClassifier(
  ValueIsPosition,
  acceptNil,
  "sticker position"
), allowedPosition = allowPosition;
const expectPosition = ValidatorForClassifier(
  ValueIsPosition,
  rejectNil,
  "sticker position"
), expectedPosition = expectPosition;
function ValueIsSize(Value) {
  return ValueIsObject(Value) && ValueIsDimension(Value.Width) && ValueIsDimension(Value.Height);
}
const allowSize = ValidatorForClassifier(
  ValueIsSize,
  acceptNil,
  "sticker size"
), allowedSize = allowSize;
const expectSize = ValidatorForClassifier(
  ValueIsSize,
  rejectNil,
  "sticker size"
), expectedSize = expectSize;
function ValueIsGeometry(Value) {
  return ValueIsObject(Value) && ValueIsLocation(Value.x) && ValueIsDimension(Value.Width) && ValueIsLocation(Value.y) && ValueIsDimension(Value.Height);
}
const allowGeometry = ValidatorForClassifier(
  ValueIsGeometry,
  acceptNil,
  "sticker geometry"
), allowedGeometry = allowGeometry;
const expectGeometry = ValidatorForClassifier(
  ValueIsGeometry,
  rejectNil,
  "sticker geometry"
), expectedGeometry = expectGeometry;
function ValueIsError(Value) {
  return ValueIsPlainObject(Value) && ValueIsOneOf(Value.Type, SNS_ErrorTypes) && ValueIsText(Value.Message);
}
const allowError = ValidatorForClassifier(
  ValueIsError,
  acceptNil,
  "error descriptor"
), allowedError = allowError;
const expectError = ValidatorForClassifier(
  ValueIsError,
  rejectNil,
  "error descriptor"
), expectedError = expectError;
function ValueIsSerializable(Value) {
  return ValueIsPlainObject(Value);
}
const allowSerializable = ValidatorForClassifier(
  ValueIsSerializable,
  acceptNil,
  "serializable object"
), allowedSerializable = allowSerializable;
const expectSerializable = ValidatorForClassifier(
  ValueIsSerializable,
  rejectNil,
  "serializable object"
), expectedSerializable = expectSerializable;
const SNS_Changes = [
  "createBoard",
  "configureFolder",
  "attachBoard",
  "detachBoard",
  "destroyBoard",
  "createSticker",
  "configureSticker",
  "attachSticker",
  "detachSticker",
  "destroySticker"
];
function createBoard(Project, BoardId) {
  expectProject("SNS project", Project);
  expectId("board id", BoardId);
  if (BoardId === Project.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let Board = Project.BoardWithId(BoardId);
  if (Board != null) {
    console.error('a board with the given "BoardId" exists already');
    return;
  }
  Board = new SNS_Board(Project, BoardId);
}
function configureFolder(Project, FolderId, Property, Value) {
  expectProject("SNS project", Project);
  expectId("folder id", FolderId);
  expectIdentifier("property identifier", Property);
  let Folder = Project.FolderWithId(FolderId);
  if (Folder == null) {
    console.error('no folder with the given "FolderId" found');
    return;
  }
  const PropertySet = ValueIsProject(Folder) ? SNS_ProjectPropertySet : SNS_BoardPropertySet;
  if (!(Property in PropertySet)) {
    console.warn('unsupported folder property "' + Property + '"');
    return;
  }
  try {
    Folder[Property] = Value;
  } catch (Signal) {
    console.warn('unsupported "' + Property + '" value received');
    return;
  }
}
function attachBoard(Project, BoardId, FolderId, Index) {
  expectProject("SNS project", Project);
  expectId("board id", BoardId);
  expectId("folder id", FolderId);
  expectOrdinal("insertion index", Index);
  if (BoardId === Project.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let Board = Project.BoardWithId(BoardId);
  if (Board == null) {
    console.error('no board with the given "BoardId" found');
    return;
  }
  let newFolder = Project.FolderWithId(FolderId);
  if (newFolder == null) {
    console.error('no folder with the given "FolderId" found');
    return;
  }
  if (Board === newFolder) {
    console.error("cannot attach a board to itself");
    return;
  }
  if (Board.containsFolder(newFolder)) {
    console.error("cannot attach an outer board to one of its inner boards");
    return;
  }
  const oldFolder = Board.Folder;
  switch (true) {
    case oldFolder === newFolder:
      setTimeout(() => sanitizeBoardList(Project, oldFolder, Board, Index), 0);
      break;
    case oldFolder != null:
      setTimeout(() => sanitizeBoardList(Project, oldFolder, Board), 0);
  }
  newFolder._attachBoardAt(Board, Index);
}
function detachBoard(Project, BoardId, FolderId, Index) {
  expectProject("SNS project", Project);
  expectId("board id", BoardId);
  expectId("folder id", FolderId);
  expectOrdinal("insertion index", Index);
  if (BoardId === Project.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let Board = Project.BoardWithId(BoardId);
  if (Board == null) {
    return;
  }
  let oldFolder = Project.FolderWithId(FolderId);
  if (oldFolder == null) {
    return;
  }
  if (Board.Folder === oldFolder && oldFolder.Board(Index) === Board) {
    oldFolder._detachBoardAt(Index);
  }
}
function destroyBoard(Project, BoardId) {
  expectProject("SNS project", Project);
  expectId("board id", BoardId);
  if (BoardId === Project.Id) {
    console.error('the given "BoardId" is the id of the current project');
    return;
  }
  let Board = Project.BoardWithId(BoardId);
  if (Board == null) {
    return;
  }
  if (Board.Folder != null || Board.BoardCount > 0 || Board.StickerCount > 0) {
    console.error("cannot destroy a board that is still in use");
    return;
  }
  Board._Project = void 0;
  unregisterFolder(Board);
}
function createSticker(Project, StickerId) {
  expectProject("SNS project", Project);
  expectId("sticker id", StickerId);
  let Sticker = Project.StickerWithId(StickerId);
  if (Sticker != null) {
    console.error('a sticker with the given "StickerId" exists already');
    return;
  }
  Sticker = new SNS_Sticker(Project, StickerId);
}
function configureSticker(Project, StickerId, Property, Value) {
  expectProject("SNS project", Project);
  expectId("sticker id", StickerId);
  expectIdentifier("property identifier", Property);
  let Sticker = Project.StickerWithId(StickerId);
  if (Sticker == null) {
    console.error('no sticker with the given "StickerId" found');
    return;
  }
  if (!(Property in SNS_StickerPropertySet)) {
    console.warn('unsupported sticker property "' + Property + '"');
    return;
  }
  try {
    Sticker[Property] = Value;
  } catch (Signal) {
    console.warn('unsupported "' + Property + '" value received');
    return;
  }
}
function attachSticker(Project, StickerId, BoardId, Index) {
  expectProject("SNS project", Project);
  expectId("sticker id", StickerId);
  expectId("board id", BoardId);
  expectOrdinal("insertion index", Index);
  let Sticker = Project.StickerWithId(StickerId);
  if (Sticker == null) {
    console.error('no sticker with the given "StickerId" found');
    return;
  }
  let newBoard = Project.BoardWithId(BoardId);
  if (newBoard == null) {
    console.error('no board with the given "BoardId" found');
    return;
  }
  const oldBoard = Sticker.Board;
  switch (true) {
    case oldBoard === newBoard:
      setTimeout(() => sanitizeStickerList(Project, oldBoard, Sticker, Index), 0);
      break;
    case oldBoard != null:
      setTimeout(() => sanitizeStickerList(Project, oldBoard, Sticker), 0);
  }
  newBoard._attachStickerAt(Sticker, Index);
}
function detachSticker(Project, StickerId, BoardId, Index) {
  expectProject("SNS project", Project);
  expectId("sticker id", StickerId);
  expectId("board id", BoardId);
  expectOrdinal("insertion index", Index);
  let Sticker = Project.StickerWithId(StickerId);
  if (Sticker == null) {
    return;
  }
  let oldBoard = Project.BoardWithId(BoardId);
  if (oldBoard == null) {
    return;
  }
  if (Sticker.Board === oldBoard && oldBoard.Sticker(Index) === Sticker) {
    oldBoard._detachStickerAt(Index);
  }
}
function destroySticker(Project, StickerId) {
  expectProject("SNS project", Project);
  expectId("sticker id", StickerId);
  let Sticker = Project.StickerWithId(StickerId);
  if (Sticker == null) {
    return;
  }
  if (Sticker.Board != null) {
    console.error("cannot destroy a sticker that is still in use");
    return;
  }
  Sticker._Project = void 0;
  unregisterSticker(Sticker);
}
function sanitizeBoardList(Project, Folder, Board, Index) {
  expectProject("SNS project", Project);
  expectFolder("folder", Folder);
  expectBoard("board", Board);
  allowOrdinal("index", Index);
  let BoardSet = /* @__PURE__ */ new Set();
  const BoardList = Folder.BoardList;
  for (let i = BoardList.length - 1; i >= 0; i--) {
    const BoardFromList = BoardList[i];
    if (BoardFromList.Folder !== Folder || //"Board" doesn't belong to "Folder"
    BoardFromList === Board && Index !== i || BoardSet.has(BoardFromList)) {
      Folder._detachBoardAt(i);
    } else {
      BoardSet.add(BoardFromList);
    }
  }
}
function sanitizeStickerList(Project, Board, Sticker, Index) {
  expectProject("SNS project", Project);
  expectBoard("board", Board);
  expectSticker("sticker", Sticker);
  allowOrdinal("index", Index);
  let StickerSet = /* @__PURE__ */ new Set();
  const StickerList = Board.StickerList;
  for (let i = StickerList.length - 1; i >= 0; i--) {
    const StickerFromList = StickerList[i];
    if (StickerFromList.Board !== Board || // "Sticker" belongs elsewhere
    StickerFromList === Sticker && Index !== i || StickerSet.has(StickerFromList)) {
      Board._detachStickerAt(i);
    } else {
      StickerSet.add(StickerFromList);
    }
  }
}
const defaultStickerGeometry = { x: 20, y: 20, Width: 80, Height: 60 };
const defaultMinWidth = 10;
const defaultMaxWidth = void 0;
const defaultMinHeight = 10;
const defaultMaxHeight = void 0;
const defaultGridWidth = 10;
const defaultGridHeight = 10;
function acceptableBoolean(Value, Default) {
  return ValueIsBoolean(Value) ? Value : Default;
}
function acceptableOptionalBoolean(Value, Default) {
  return Value == null ? void 0 : ValueIsBoolean(Value) ? Value : Default;
}
function acceptableNumber(Value, Default) {
  return ValueIsNumber(Value) ? Value : Default;
}
function acceptableOptionalNumber(Value, Default) {
  return ValueIsNumber(Value) ? Value : Default;
}
function acceptableNumberInRange(Value, Default, minValue = -Infinity, maxValue = Infinity, withMin = false, withMax = false) {
  return ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax) ? Value : Default;
}
function acceptableOptionalNumberInRange(Value, Default, minValue = -Infinity, maxValue = Infinity, withMin = false, withMax = false) {
  return ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax) ? Value : Default;
}
function acceptableInteger(Value, Default) {
  return ValueIsInteger(Value) ? Value : Default;
}
function acceptableOptionalInteger(Value, Default) {
  return ValueIsInteger(Value) ? Value : Default;
}
function acceptableIntegerInRange(Value, Default, minValue = -Infinity, maxValue = Infinity) {
  return ValueIsIntegerInRange(Value, minValue, maxValue) ? Value : Default;
}
function acceptableOptionalIntegerInRange(Value, Default, minValue = -Infinity, maxValue = Infinity) {
  return ValueIsIntegerInRange(Value, minValue, maxValue) ? Value : Default;
}
function acceptableOrdinal(Value, Default) {
  return ValueIsOrdinal(Value) ? Value : Default;
}
function acceptableOptionalOrdinal(Value, Default) {
  return ValueIsOrdinal(Value) ? Value : Default;
}
function acceptableString(Value, Default) {
  return ValueIsString(Value) ? Value : Default;
}
function acceptableOptionalString(Value, Default) {
  return ValueIsString(Value) ? Value : Default;
}
function acceptableNonEmptyString(Value, Default) {
  return ValueIsString(Value) && Value.trim() !== "" ? Value : Default;
}
function acceptableOptionalNonEmptyString(Value, Default) {
  return ValueIsString(Value) && Value.trim() !== "" ? Value : Default;
}
function acceptableStringMatching(Value, Default, Pattern) {
  return ValueIsStringMatching(Value, Pattern) ? Value : Default;
}
function acceptableOptionalStringMatching(Value, Default, Pattern) {
  return ValueIsStringMatching(Value, Pattern) ? Value : Default;
}
function acceptableText(Value, Default) {
  return ValueIsText(Value) ? Value : Default;
}
function acceptableOptionalText(Value, Default) {
  return ValueIsText(Value) ? Value : Default;
}
function acceptableTextline(Value, Default) {
  return (ValueIsTextline(Value) ? Value : Default).replace(
    /[\f\r\n\v\u0085\u2028\u2029].*$/,
    "..."
  );
}
function acceptableOptionalTextline(Value, Default) {
  const Result = ValueIsTextline(Value) ? Value : Default;
  return Result == null ? void 0 : Result.replace(/[\f\r\n\v\u0085\u2028\u2029].*$/, "...");
}
function acceptableFunction(Value, Default) {
  return ValueIsFunction(Value) ? Value : Default;
}
function acceptableOptionalFunction(Value, Default) {
  return ValueIsFunction(Value) ? Value : Default;
}
function acceptableList(Value, Default) {
  return ValueIsList(Value) ? Value : Default;
}
function acceptableOptionalList(Value, Default) {
  return ValueIsList(Value) ? Value : Default;
}
function acceptableListSatisfying(Value, Default, Matcher) {
  return ValueIsListSatisfying(Value, Matcher) ? Value : Default;
}
function acceptableOptionalListSatisfying(Value, Default, Matcher) {
  return ValueIsListSatisfying(Value, Matcher) ? Value : Default;
}
function acceptableColor(Value, Default) {
  return ValueIsColor(Value) ? Value : Default;
}
function acceptableOptionalColor(Value, Default) {
  return ValueIsColor(Value) ? Value : Default;
}
function acceptableEMailAddress(Value, Default) {
  return ValueIsEMailAddress(Value) ? Value : Default;
}
function acceptablePhoneNumber(Value, Default) {
  return ValueIsPhoneNumber(Value) ? Value : Default;
}
function acceptableURL(Value, Default) {
  return ValueIsURL(Value) ? Value : Default;
}
function DefaultRenderer() {
  return m`<div class="SNS DefaultSticker" style=${CSSStyleOfVisual(this)}/>`;
}
function ErrorRenderer() {
  const Error2 = this.Error;
  if (Error2 == null) {
    return DefaultRenderer.call(this);
  }
  const onClick = () => this.Project.showError(this, Error2);
  return m`<div class="SNS DefaultSticker">
      <div class="SNS ErrorIndicator" onClick=${onClick}/>
    </div>`;
}
const newId = customAlphabet(nolookalikesSafe, 21);
const FolderRegistryForProject = /* @__PURE__ */ new WeakMap();
function registerFolder(Project, Folder) {
  let FolderRegistry = FolderRegistryForProject.get(Project);
  if (FolderRegistry == null) {
    FolderRegistryForProject.set(Project, FolderRegistry = /* @__PURE__ */ Object.create(null));
  }
  const Id = Folder.Id;
  if (Id in FolderRegistry)
    throwError(
      "NonUniqueId: the id of the given folder (" + quoted(Id) + ") has already been registered"
    );
  FolderRegistry[Id] = Folder;
}
function unregisterFolder(Folder) {
  const Project = Folder.Project;
  let FolderRegistry = FolderRegistryForProject.get(Project);
  if (FolderRegistry == null) {
    return;
  }
  delete FolderRegistry[Folder.Id];
}
function FolderWithId(Project, Id) {
  let FolderRegistry = FolderRegistryForProject.get(Project);
  if (FolderRegistry == null) {
    return void 0;
  }
  return FolderRegistry[Id];
}
const StickerRegistryForProject = /* @__PURE__ */ new WeakMap();
function registerSticker(Project, Sticker) {
  let StickerRegistry = StickerRegistryForProject.get(Project);
  if (StickerRegistry == null) {
    StickerRegistryForProject.set(Project, StickerRegistry = /* @__PURE__ */ Object.create(null));
  }
  const Id = Sticker.Id;
  if (Id in StickerRegistry)
    throwError(
      "NonUniqueId: the id of the given sticker (" + quoted(Id) + ") has already been registered"
    );
  StickerRegistry[Id] = Sticker;
}
function unregisterSticker(Sticker) {
  const Project = Sticker.Project;
  let StickerRegistry = StickerRegistryForProject.get(Project);
  if (StickerRegistry == null) {
    return;
  }
  delete StickerRegistry[Sticker.Id];
}
function StickerWithId(Project, Id) {
  let StickerRegistry = StickerRegistryForProject.get(Project);
  if (StickerRegistry == null) {
    return void 0;
  }
  return StickerRegistry[Id];
}
function removeIdsFrom(Serialization) {
  expectSerializable("serialization", Serialization);
  delete Serialization.Id;
  if (ValueIsList(Serialization.BoardList)) {
    Serialization.BoardList.forEach(
      (Serialization2) => removeIdsFrom(Serialization2)
    );
  }
  if (ValueIsList(Serialization.StickerList)) {
    Serialization.StickerList.forEach(
      (Serialization2) => removeIdsFrom(Serialization2)
    );
  }
}
const reactiveFunctionsForVisual = /* @__PURE__ */ new WeakMap();
function registerReactiveFunctionIn(Visual, reactiveFunction) {
  let reactiveFunctions = reactiveFunctionsForVisual.get(Visual);
  if (reactiveFunctions == null) {
    reactiveFunctionsForVisual.set(Visual, reactiveFunctions = []);
  }
  reactiveFunctions.push(reactiveFunction);
}
function unregisterAllReactiveFunctionsFrom(Visual) {
  let reactiveFunctions = reactiveFunctionsForVisual.get(Visual);
  if (reactiveFunctions == null) {
    return;
  }
  reactiveFunctions.forEach((reactiveFunction) => {
    dispose(reactiveFunction);
  });
}
const groupedBehaviorRegistry = /* @__PURE__ */ Object.create(null);
const BehaviorRegistry = /* @__PURE__ */ Object.create(null);
const TemplateRegistry = /* @__PURE__ */ Object.create(null);
function registerBehavior(GroupLabel, BehaviorLabel, BehaviorName, Template, BehaviorFunction, BehaviorStyle) {
  expectTextline("behavior group label", GroupLabel);
  expectTextline("behavior label", BehaviorLabel);
  expectIdentifier("behavior name", BehaviorName);
  allowPlainObject("sticker template", Template);
  allowFunction("behavior function", BehaviorFunction);
  const normalizedGroupName = GroupLabel.toLowerCase().replace(/\s/g, "");
  const normalizedBehaviorName = BehaviorName.toLowerCase();
  const normalizedTemplate = { ...Template };
  if (normalizedTemplate.activeScript == null) {
    normalizedTemplate.activeScript = `useBehavior('${BehaviorName}')
`;
  } else {
    normalizedTemplate.activeScript = normalizedTemplate.activeScript.replace(/^\s*\n/, "").replace(/\n\s*$/, "\n");
  }
  if (normalizedBehaviorName in BehaviorRegistry)
    throwError(
      "BehaviorExists: behavior " + quoted(BehaviorName) + " was already registered"
    );
  let BehaviorSetGroup = groupedBehaviorRegistry[normalizedGroupName];
  if (BehaviorSetGroup == null) {
    groupedBehaviorRegistry[normalizedGroupName] = BehaviorSetGroup = {
      GroupLabel,
      BehaviorSet: /* @__PURE__ */ Object.create(null)
    };
  }
  BehaviorSetGroup.BehaviorSet[BehaviorName] = {
    Label: BehaviorLabel,
    Executable: BehaviorFunction,
    Template: normalizedTemplate
  };
  if (BehaviorFunction != null) {
    TemplateRegistry[normalizedBehaviorName] = normalizedTemplate;
    BehaviorRegistry[normalizedBehaviorName] = BehaviorFunction;
  }
  if (BehaviorStyle != null) {
    if (BehaviorStyleElement.innerHTML.indexOf(BehaviorStyle.trim()) < 0) {
      BehaviorStyleElement.innerHTML += BehaviorStyle;
    }
  }
}
function groupedBehaviorEntryList() {
  const Result = [];
  function BehaviorEntriesIn(BehaviorGroup) {
    const BehaviorEntryList = [];
    const BehaviorSet = BehaviorGroup.BehaviorSet;
    for (let BehaviorName in BehaviorSet) {
      BehaviorEntryList.push({
        Label: BehaviorSet[BehaviorName].Label,
        Name: BehaviorName,
        disabled: !(BehaviorName.toLowerCase() in BehaviorRegistry)
      });
    }
    return { GroupLabel: BehaviorGroup.GroupLabel, BehaviorEntryList };
  }
  for (let GroupLabel in groupedBehaviorRegistry) {
    Result.push(BehaviorEntriesIn(groupedBehaviorRegistry[GroupLabel]));
  }
  return Result;
}
function useBehavior(BehaviorName) {
  expectSticker("visual", this);
  expectIdentifier("behavior name", BehaviorName);
  const BehaviorFunction = BehaviorRegistry[BehaviorName.toLowerCase()];
  if (BehaviorFunction == null)
    throwError(
      "NoSuchBehavior: no behavior called " + quoted(BehaviorName) + " found"
    );
  const reactively = (reactiveFunction) => {
    expectFunction("reactive function", reactiveFunction);
    registerReactiveFunctionIn(this, computed(reactiveFunction));
  };
  const onRender = this.onRender.bind(this);
  const onMount = this.onMount.bind(this);
  const onUnmount = this.onUnmount.bind(this);
  BehaviorFunction.call(this, this, this, m, reactively, onRender, onMount, onUnmount);
}
function TemplateOfBehavior(BehaviorName) {
  expectIdentifier("behavior name", BehaviorName);
  const normalizedBehaviorName = BehaviorName.toLowerCase();
  const BehaviorFunction = BehaviorRegistry[normalizedBehaviorName];
  if (BehaviorFunction == null)
    throwError(
      "NoSuchBehavior: no behavior called " + quoted(BehaviorName) + " found"
    );
  return TemplateRegistry[normalizedBehaviorName];
}
registerBehavior("basic Views", "plain Sticker", "plainSticker", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  activeScript: 'onRender(() => html`<div class="SNS Placeholder"></div>`)'
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  onRender(() => html2`<div class="SNS plainSticker"></div>`);
}, `
/**** plain Stickers ****/

  .SNS.plainSticker {
    border:dotted 1px gray;
  }
  `);
registerBehavior("basic Views", "sticky Note", "stickyNote", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  minWidth: 20,
  minHeight: 10
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function(PropSet) {
    const { builtinSelection, builtinDragging } = PropSet;
    const Value = acceptableText(my.Value, "");
    const onKeyDown = (Event) => {
      if (Event.key === "Tab") {
        Event.stopPropagation();
        Event.preventDefault();
        const Editor = Event.target;
        const { value, selectionStart, selectionEnd } = Editor;
        Editor.value = value.slice(0, selectionStart) + "	" + value.slice(selectionEnd);
        Editor.selectionStart = Editor.selectionEnd = selectionStart + 1;
        return false;
      }
    };
    const onInput = (Event) => {
      my.Value = Event.target.value;
    };
    return html2`<div class="SNS NoteSticker" style=${CSSStyleOfVisual(me)}
        onPointerDown=${builtinSelection}
      >
        <div class="Header builtinDraggable"
          onPointerDown=${builtinDragging} onPointerMove=${builtinDragging}
          onPointerUp=${builtinDragging} onPointerCancel=${builtinDragging}
        />
        <textarea class="Editor" value=${Value} tabindex=-1
          onKeyDown=${onKeyDown} onInput=${onInput}
        ></textarea>
      </div>`;
  };
}, `
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
  `);
registerBehavior("basic Views", "Placeholder", "Placeholder", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function(PropSet) {
    const { builtinDragging } = PropSet;
    const { Width, Height } = my.Geometry;
    return html2`<div class="SNS Placeholder builtinDraggable" style="
        line-height:${Height}px;
      "
        onPointerDown=${builtinDragging} onPointerMove=${builtinDragging}
        onPointerUp=${builtinDragging} onPointerCancel=${builtinDragging}
      >${Width}x${Height}</div>`;
  };
}, `
/**** simple Placeholders ****/

  .SNS.Placeholder {
    border:dotted 1px gray;
    text-align:center;
  }
  `);
registerBehavior("basic Views", "Title", "Title", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Title"
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  onRender(() => {
    const Value = acceptableTextline(my.Value, "");
    return html2`<div class="SNS Title">${Value}</div>`;
  });
}, `
/**** Title Views ****/

  .SNS.Sticker > .SNS.Title {
    font-size:22px; font-weight:bold; line-height:32px;
  }
  `);
registerBehavior("basic Views", "Subtitle", "Subtitle", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Subtitle"
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  onRender(() => {
    const Value = acceptableTextline(my.Value, "");
    return html2`<div class="SNS Subtitle">${Value}</div>`;
  });
}, `
/**** Subtitle Views ****/

  .SNS.Sticker > .SNS.Subtitle {
    font-size:18px; font-weight:bold; line-height:27px;
  }
  `);
registerBehavior("basic Views", "Label", "Label", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Label"
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  onRender(() => {
    const Value = acceptableTextline(my.Value, "");
    return html2`<div class="SNS Label">${Value}</div>`;
  });
}, `
/**** Label Views ****/

  .SNS.Sticker > .SNS.Label {
    font-size:14px; font-weight:bold; line-height:21px;
  }
  `);
registerBehavior("basic Views", "Text", "Text", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Text"
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  onRender(() => {
    const Value = acceptableText(my.Value, "");
    return html2`<div class="SNS Text">${Value}</div>`;
  });
}, `
/**** Text Views ****/

  .SNS.Sticker > .SNS.Text {
    font-size:14px; font-weight:normal; line-height:21px;
  }
  `);
registerBehavior("basic Views", "FinePrint", "FinePrint", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "FinePrint"
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  onRender(() => {
    const Value = acceptableText(my.Value, "");
    return html2`<div class="SNS FinePrint">${Value}</div>`;
  });
}, `
/**** FinePrint Views ****/

  .SNS.Sticker > .SNS.FinePrint {
    font-size:12px; font-weight:normal; line-height:18px;
  }
  `);
registerBehavior("basic Views", "HTML View", "HTMLView", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  Value: "<b><u>HTML View</u></b>",
  activeScript: `
  useBehavior('HTMLView')
//my.Value = 'HTML Markup'
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = () => html2`<div class="SNS HTMLView"
      dangerouslySetInnerHTML=${{ __html: acceptableText(my.Value, "") }}
    />`;
});
registerBehavior("basic Views", "Image View", "ImageView", {
  Geometry: { x: 20, y: 20, Width: 90, Height: 90 },
  Value: "https://www.rozek.de/Bangle.js/Mandelbrot_240x240.png",
  activeScript: `
  useBehavior('ImageView')
//my.Value = 'Image URL'
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = () => html2`<img class="SNS ImageView" src=${acceptableURL(my.Value, "")}/>`;
}, `
/**** Image View ****/

  .SNS.Sticker > .SNS.ImageView {
    object-fit:contain; object-position:center;
  }
  `);
registerBehavior("basic Views", "SVG View", "SVGView", {
  Geometry: { x: 20, y: 20, Width: 90, Height: 90 },
  activeScript: `
  useBehavior('SVGView')
//my.Value = 'SVG Document'
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = () => {
    const DataURL = "data:image/svg+xml;base64," + btoa(acceptableText(my.Value, ""));
    return html2`<div class="SNS SVGView" src=${DataURL}/>`;
  };
}, `
/**** SVG View ****/

  .SNS.Sticker > .SNS.SVGView {
    object-fit:contain; object-position:center;
  }
  `);
registerBehavior("basic Views", "2D Canvas View", "Canvas2DView");
registerBehavior("basic Views", "Web View", "WebView", {
  Geometry: { x: 20, y: 20, Width: 640, Height: 480 },
  minWidth: 120,
  minHeight: 80,
  Value: "https://www.rozek.de",
  activeScript: `
  useBehavior('WebView')
//my.Value = 'Document URL'
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = () => html2`<iframe class="SNS WebView"
      src=${acceptableURL(my.Value, "")}
    />`;
});
registerBehavior("basic Views", "Badge", "Badge", {
  Geometry: { x: 20, y: 20, Width: 30, Height: 30 },
  Value: 1,
  ForegroundColor: "red",
  BackgroundColor: "white"
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = () => {
    const Value = ValueIsNumber(my.Value) ? "" + my.Value : acceptableTextline(my.Value, "");
    const BorderRadius = Math.round(Math.min(my.Width, my.Height / 2));
    return html2`<div class="SNS Badge" style="
        border-color:${my.ForegroundColor}; border-radius:${BorderRadius}px;
        line-height:${my.Height - 4}px;
      ">${acceptableTextline(Value, "")}</>`;
  };
}, `
/**** Badge ****/

  .SNS.Sticker > .SNS.Badge {
    font-size:18px; font-weight:bold; text-align:center;
    border:solid 2px black;
  }
  `);
registerBehavior("basic Views", "Icon", "Icon", {
  Geometry: { x: 20, y: 20, Width: 24, Height: 24 },
  Value: null,
  activeScript: `
  useBehavior('Icon')
//my.Value = 'icon image url'
//onClick(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  function onClick(Event) {
    if (my.Enabling == false) {
      return;
    }
    my.Value = Event.target.value;
    if (typeof my._onClick === "function") {
      my._onClick(Event);
    }
  }
  my.Renderer = () => {
    const Value = acceptableURL(my.Value, "/img/pencil.png");
    const Color = acceptableColor(my.Color, "black");
    return html2`<div class="SNS Icon" style="
        -webkit-mask-image:url(${Value}); mask-image:url(${Value});
        background-color:${Color};
      " disabled=${my.Enabling == false} onClick=${onClick}
      />`;
  };
}, `
/**** Icon ****/

  .SNS.Sticker > .SNS.Icon {
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  `);
registerBehavior("basic Views", "horizontal Separator", "horizontalSeparator", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 10 },
  minWidth: 10
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  onRender(() => html2`<div class="SNS horizontalSeparator"></div>`);
}, `
/**** horizontal Separator ****/

  .SNS.horizontalSeparator {
    border:none; border-top:solid 1px black;
  }
  `);
registerBehavior("basic Views", "vertical Separator", "verticalSeparator", {
  Geometry: { x: 20, y: 20, Width: 10, Height: 40 },
  minHeight: 10
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  onRender(() => html2`<div class="SNS verticalSeparator"></div>`);
}, `
/**** vertical Separator ****/

  .SNS.verticalSeparator {
    border:none; border-left:solid 1px black;
  }
  `);
registerBehavior("basic Views", "Tab", "Tab");
registerBehavior("basic Views", "Icon Tab", "IconTab");
registerBehavior("native Controls", "Button", "Button", {
  Geometry: { x: 20, y: 20, Width: 80, Height: 30 },
  Value: "Button",
  activeScript: `
  useBehavior('Button')
//my.Value = 'Label'
//onClick(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  function onClick(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    if (typeof my._onClick === "function") {
      my._onClick(Event);
    }
  }
  my.Renderer = () => {
    const Label = acceptableTextline(my.Label || my.Value, "");
    return html2`<button class="SNS Button" style="
        line-height:${my.LineHeight || my.Height}px;
      " disabled=${my.Enabling == false} onClick=${onClick}
      >${Label}</>`;
  };
}, `
/**** Button ****/

  .SNS.Sticker > .SNS.Button {
    border:solid 1px black; border-radius:4px;
    background:white;
    font-weight:bold; color:black;
    text-align.center;
  }
  `);
registerBehavior("native Controls", "Checkbox", "Checkbox", {
  Geometry: { x: 20, y: 20, Width: 20, Height: 20 },
  Value: null,
  activeScript: `
  useBehavior('Checkbox')
//my.Value = null/true/false
//onClick(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  function onClick(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.checked;
    if (typeof my._onClick === "function") {
      my._onClick(Event);
    }
  }
  my.Renderer = () => {
    const Value = acceptableOptionalBoolean(my.Value);
    const checked = Value == true;
    const indeterminate = Value == null;
    return html2`<input type="checkbox" class="SNS Checkbox"
        checked=${checked} indeterminate=${indeterminate}
        disabled=${my.Enabling == false} onClick=${onClick}
      />`;
  };
});
registerBehavior("native Controls", "Radiobutton", "Radiobutton", {
  Geometry: { x: 20, y: 20, Width: 20, Height: 20 },
  Value: null,
  activeScript: `
  useBehavior('Radiobutton')
//my.Value = true/false
//onClick(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  function onClick(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.checked;
    if (typeof my._onClick === "function") {
      my._onClick(Event);
    }
  }
  my.Renderer = () => {
    const Value = acceptableBoolean(my.Value, false);
    return html2`<input type="radio" class="SNS Radiobutton"
        checked=${Value == true}
        disabled=${my.Enabling == false} onClick=${onClick}
      />`;
  };
});
registerBehavior("native Controls", "Gauge", "Gauge", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 20 },
  Value: 0,
  activeScript: `
  useBehavior('Gauge')
//my.Value      = 0
//my.Minimum    = 0
//my.lowerBound = 0
//my.Optimum    = undefined
//my.upperBound = 1
//my.Maximum    = 1
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = () => {
    const Value = acceptableNumber(
      ValueIsString(my.Value) ? parseFloat(my.Value) : my.Value,
      0
    );
    const Minimum = acceptableOptionalNumber(my.Minimum);
    const lowerBound = acceptableOptionalNumber(my.lowerBound);
    const Optimum = acceptableOptionalNumber(my.Optimum);
    const upperBound = acceptableOptionalNumber(my.upperBound);
    const Maximum = acceptableOptionalNumber(my.Maximum);
    return html2`<meter class="SNS Gauge" value=${Value}
        min=${Minimum} low=${lowerBound} opt=${Optimum}
        high=${upperBound} max=${Maximum}
      />`;
  };
});
registerBehavior("native Controls", "Progressbar", "Progressbar", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 10 },
  Value: 0,
  activeScript: `
  useBehavior('Progressbar')
//my.Value   = 0
//my.Maximum = 1
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = () => {
    const Value = acceptableNumber(
      ValueIsString(my.Value) ? parseFloat(my.Value) : my.Value,
      0
    );
    const Maximum = acceptableOptionalNumber(my.Maximum);
    return html2`<progress class="SNS Progressbar" value=${Value} max=${Maximum}/>`;
  };
});
const HashmarkPattern = /^\s*([+-]?(\d+([.]\d+)?|[.]\d+)([eE][+-]?\d+)?|\d*[.](?:\d*))(?:\s*:\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/;
registerBehavior("native Controls", "Slider", "Slider", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 20 },
  Value: null,
  activeScript: `
  useBehavior('Slider')
//my.Value     = 0
//my.Minimum   = undefined
//my.Stepping  = undefined
//my.Maximum   = undefined
//my.Hashmarks = [0:'zero',1,2]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = 0;
  function HashmarkMatcher(Value) {
    return ValueIsStringMatching(Value, HashmarkPattern) || ValueIsNumber(Value);
  }
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = parseFloat(Event.target.value);
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableNumber(
      ValueIsString(my.Value) ? parseFloat(my.Value) : my.Value,
      0
    );
    const Minimum = acceptableOptionalNumber(my.Minimum);
    const Stepping = acceptableOptionalNumberInRange(my.Stepping, void 0, 0);
    const Maximum = acceptableOptionalNumber(my.Maximum);
    const Hashmarks = acceptableOptionalListSatisfying(
      my.Hashmarks,
      void 0,
      HashmarkMatcher
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let HashmarkList = "", HashmarkId;
    if (Hashmarks != null && Hashmarks.length > 0) {
      HashmarkId = my.Id + "-Hashmarks";
      HashmarkList = html2`\n<datalist id=${HashmarkId}>
          ${Hashmarks.map((Item) => {
        Item = "" + Item;
        const Value2 = Item.replace(/:.*$/, "").trim();
        const Label = Item.replace(/^[^:]+:/, "").trim();
        return html2`<option value=${Value2}>${Label}</option>`;
      })}
        </datalist>`;
    }
    return html2`<input type="range" class="SNS Slider"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${HashmarkId}
      />${HashmarkList}`;
  };
});
registerBehavior("native Controls", "Textline Input", "TextlineInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
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
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableTextline(my.Value, "");
    const Placeholder = acceptableOptionalTextline(my.Placeholder);
    const readonly = acceptableOptionalBoolean(my.readonly);
    const minLength = acceptableOptionalOrdinal(my.minLength);
    const maxLength = acceptableOptionalOrdinal(my.maxLength);
    const Pattern = acceptableOptionalTextline(my.Pattern);
    const SpellChecking = acceptableOptionalBoolean(my.SpellChecking);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      ValueIsTextline
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="text" class="SNS TextlineInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readonly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** TextlineInput ****/

  .SNS.Sticker > .SNS.TextlineInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.TextlineInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
registerBehavior("native Controls", "Password Input", "PasswordInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('PasswordInput')
//my.Value       = ''
//my.Placeholder = undefined
//my.readonly    = false
//my.minLength   = 0
//my.maxLength   = undefined
//my.Pattern     = '.*'
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableTextline(my.Value, "");
    const Placeholder = acceptableOptionalTextline(my.Placeholder);
    const readonly = acceptableOptionalBoolean(my.readonly);
    const minLength = acceptableOptionalOrdinal(my.minLength);
    const maxLength = acceptableOptionalOrdinal(my.maxLength);
    const Pattern = acceptableOptionalTextline(my.Pattern);
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    return html2`<input type="password" class="SNS PasswordInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readonly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
      />`;
  };
}, `
/**** PasswordInput ****/

  .SNS.Sticker > .SNS.PasswordInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.PasswordInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
registerBehavior("native Controls", "Number Input", "NumberInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('NumberInput')
//my.Value       = 0
//my.Placeholder = undefined
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = [0,...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = 0;
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = parseFloat(Event.target.value);
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableNumber(
      ValueIsString(my.Value) ? parseFloat(my.Value) : my.Value,
      0
    );
    const Placeholder = acceptableOptionalTextline(my.Placeholder);
    const readonly = acceptableOptionalBoolean(my.readonly);
    const Minimum = acceptableOptionalNumber(my.Minimum);
    const Stepping = acceptableOptionalNumberInRange(my.Stepping, void 0, 0);
    const Maximum = acceptableOptionalNumber(my.Maximum);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      ValueIsNumber
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="number" class="SNS NumberInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readonly=${readonly} placeholder=${Placeholder}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** NumberInput ****/

  .SNS.Sticker > .SNS.NumberInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.NumberInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
registerBehavior("native Controls", "Phone Number Input", "PhoneNumberInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('PhoneNumberInput')
//my.Value         = ''
//my.Placeholder   = undefined
//my.readonly      = false
//my.minLength     = 0
//my.maxLength     = undefined
//my.Pattern       = '.*'
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptablePhoneNumber(my.Value, "");
    const Placeholder = acceptableOptionalTextline(my.Placeholder);
    const readonly = acceptableOptionalBoolean(my.readonly);
    const minLength = acceptableOptionalOrdinal(my.minLength);
    const maxLength = acceptableOptionalOrdinal(my.maxLength);
    const Pattern = acceptableOptionalTextline(my.Pattern);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      ValueIsPhoneNumber
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="tel" class="SNS PhoneNumberInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readonly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** PhoneNumberInput ****/

  .SNS.Sticker > .SNS.PhoneNumberInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.PhoneNumberInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
registerBehavior("native Controls", "EMail Address Input", "EMailAddressInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('EMailAddressInput')
//my.Value       = ''
//my.Placeholder = undefined
//my.readonly    = false
//my.minLength   = 0
//my.maxLength   = undefined
//my.Pattern     = '.*'
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableEMailAddress(my.Value, "");
    const Placeholder = acceptableOptionalTextline(my.Placeholder);
    const readonly = acceptableOptionalBoolean(my.readonly);
    const minLength = acceptableOptionalOrdinal(my.minLength);
    const maxLength = acceptableOptionalOrdinal(my.maxLength);
    const Pattern = acceptableOptionalTextline(my.Pattern);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      ValueIsEMailAddress
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="email" class="SNS EMailAddressInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readonly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** EMailAddressInput ****/

  .SNS.Sticker > .SNS.EMailAddressInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.EMailAddressInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
registerBehavior("native Controls", "URL Input", "URLInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('URLInput')
//my.Value       = ''
//my.Placeholder = undefined
//my.readonly    = false
//my.minLength   = 0
//my.maxLength   = undefined
//my.Pattern     = '.*'
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableURL(my.Value, "");
    const Placeholder = acceptableOptionalTextline(my.Placeholder);
    const readonly = acceptableOptionalBoolean(my.readonly);
    const minLength = acceptableOptionalOrdinal(my.minLength);
    const maxLength = acceptableOptionalOrdinal(my.maxLength);
    const Pattern = acceptableOptionalTextline(my.Pattern);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      ValueIsURL
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="url" class="SNS URLInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readonly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** URLInput ****/

  .SNS.Sticker > .SNS.URLInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.URLInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
const TimePattern = "\\d{2}:\\d{2}";
const TimeRegExp = /\d{2}:\d{2}/;
function TimeMatcher(Value) {
  return ValueIsStringMatching(Value, TimeRegExp);
}
registerBehavior("native Controls", "Time Input", "TimeInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('TimeInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableOptionalStringMatching(
      my.Value,
      void 0,
      TimeRegExp
    );
    const readonly = acceptableOptionalBoolean(my.readonly);
    const Minimum = acceptableOptionalStringMatching(my.Minimum, void 0, TimeRegExp);
    const Stepping = acceptableOptionalNumberInRange(my.Stepping, void 0, 0);
    const Maximum = acceptableOptionalStringMatching(my.Maximum, void 0, TimeRegExp);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      TimeMatcher
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="time" class="SNS TimeInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readonly=${readonly} pattern=${TimePattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** TimeInput ****/

  .SNS.Sticker > .SNS.TimeInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.TimeInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
const DateTimePattern = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}";
const DateTimeRegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
function DateTimeMatcher(Value) {
  return ValueIsStringMatching(Value, DateTimeRegExp);
}
registerBehavior("native Controls", "Date and Time Input", "DateTimeInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('DateTimeInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableOptionalStringMatching(
      my.Value,
      void 0,
      DateTimeRegExp
    );
    const readonly = acceptableOptionalBoolean(my.readonly);
    const Minimum = acceptableOptionalStringMatching(my.Minimum, void 0, DateTimeRegExp);
    const Stepping = acceptableOptionalNumberInRange(my.Stepping, void 0, 0);
    const Maximum = acceptableOptionalStringMatching(my.Maximum, void 0, DateTimeRegExp);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      DateTimeMatcher
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="datetime-local" class="SNS DateTimeInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readonly=${readonly} pattern=${DateTimePattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** DateTimeInput ****/

  .SNS.Sticker > .SNS.DateTimeInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.DateTimeInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
const DatePattern = "\\d{4}-\\d{2}-\\d{2}";
const DateRegExp = /\d{4}-\d{2}-\d{2}/;
function DateMatcher(Value) {
  return ValueIsStringMatching(Value, DateRegExp);
}
registerBehavior("native Controls", "Date Input", "DateInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('DateInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableOptionalStringMatching(
      my.Value,
      void 0,
      DateRegExp
    );
    const readonly = acceptableOptionalBoolean(my.readonly);
    const Minimum = acceptableOptionalStringMatching(my.Minimum, void 0, DateRegExp);
    const Stepping = acceptableOptionalNumberInRange(my.Stepping, void 0, 0);
    const Maximum = acceptableOptionalStringMatching(my.Maximum, void 0, DateRegExp);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      DateMatcher
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="date" class="SNS DateInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readonly=${readonly} pattern=${DatePattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** DateInput ****/

  .SNS.Sticker > .SNS.DateInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.DateInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
const WeekPattern = "\\d{4}-W\\d{2}";
const WeekRegExp = /\d{4}-W\d{2}/;
function WeekMatcher(Value) {
  return ValueIsStringMatching(Value, WeekRegExp);
}
registerBehavior("native Controls", "Week Input", "WeekInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('WeekInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableOptionalStringMatching(
      my.Value,
      void 0,
      WeekRegExp
    );
    const readonly = acceptableOptionalBoolean(my.readonly);
    const Minimum = acceptableOptionalStringMatching(my.Minimum, void 0, WeekRegExp);
    const Stepping = acceptableOptionalNumberInRange(my.Stepping, void 0, 0);
    const Maximum = acceptableOptionalStringMatching(my.Maximum, void 0, WeekRegExp);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      WeekMatcher
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="week" class="SNS WeekInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readonly=${readonly} pattern=${WeekPattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** WeekInput ****/

  .SNS.Sticker > .SNS.WeekInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.WeekInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
const MonthPattern = "\\d{4}-\\d{2}";
const MonthRegExp = /\d{4}-\d{2}/;
function MonthMatcher(Value) {
  return ValueIsStringMatching(Value, MonthRegExp);
}
registerBehavior("native Controls", "Month Input", "MonthInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('MonthInput')
//my.Value       = 0
//my.readonly    = false
//my.Minimum     = undefined
//my.Stepping    = undefined
//my.Maximum     = undefined
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableOptionalStringMatching(
      my.Value,
      void 0,
      MonthRegExp
    );
    const readonly = acceptableOptionalBoolean(my.readonly);
    const Minimum = acceptableOptionalStringMatching(my.Minimum, void 0, MonthRegExp);
    const Stepping = acceptableOptionalNumberInRange(my.Stepping, void 0, 0);
    const Maximum = acceptableOptionalStringMatching(my.Maximum, void 0, MonthRegExp);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      MonthMatcher
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="month" class="SNS MonthInput"
        value=${Value} min=${Minimum} max=${Maximum} step=${Stepping}
        readonly=${readonly} pattern=${MonthPattern}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** MonthInput ****/

  .SNS.Sticker > .SNS.MonthInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.MonthInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
registerBehavior("native Controls", "File Input", "FileInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('FileInput')
//my.Value           = ''
//my.Placeholder     = undefined
//my.acceptableTypes = undefined
//my.multiple        = false
//onInput(() => ...)
//onDrop(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event, Event.files);
    }
  }
  function onDragEnter(Event) {
    return consumingEvent(Event);
  }
  function onDragOver(Event) {
    return consumingEvent(Event);
  }
  function onDrop(Event) {
    consumeEvent(Event);
    if (my.Enabling == false) {
      return;
    }
    my.Value = Event.target.value;
    if (typeof my._onDrop === "function") {
      my._onDrop(Event, Event.dataTransfer.files);
    }
  }
  my.Renderer = () => {
    let Value = acceptableTextline(my.Value, "").trim();
    Value = Value.replace("C:\\fakepath\\", "");
    const Placeholder = acceptableTextline(my.Placeholder, "").trim();
    const acceptableTypes = acceptableOptionalTextline(my.acceptableTypes);
    const multiple = acceptableOptionalBoolean(my.multiple);
    return html2`<label class="SNS FileInput"
        onDragEnter=${onDragEnter} onDragOver=${onDragOver} onDrop=${onDrop}
      >
        <input type="file" style="display:none"
          multiple=${multiple} accept=${acceptableTypes}
          onInput=${onInput}
        />
        ${Value === "" ? Placeholder === "" ? "" : html2`<span style="line-height:${my.Height}px">${Placeholder}</span>` : html2`<span style="line-height:${my.Height}px">${Value}</span>`}
      </label>`;
  };
}, `
/**** FileInput ****/

  .SNS.Sticker > .SNS.FileInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  .SNS.Sticker > .SNS.FileInput > span {
    display:block; position:absolute; overflow:hidden;
    left:0px; top:0px; width:100%; height:100%;
    padding:0px 2px 0px 2px; white-space:pre; text-overflow:ellipsis;
  }
  `);
registerBehavior("native Controls", "Pseudo File Input", "PseudoFileInput", {
  Geometry: { x: 20, y: 20, Width: 24, Height: 24 },
  Value: null,
  activeScript: `
  useBehavior('PseudoFileInput')
//my.Value           = ''
//my.Icon            = 'icon image url'
//my.acceptableTypes = undefined
//my.multiple        = false
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event, Event.files);
    }
  }
  my.Renderer = () => {
    const Icon = acceptableURL(my.Icon, "/img/arrow-up-from-bracket.png");
    const Color = acceptableColor(my.Color, "black");
    const acceptableTypes = acceptableOptionalTextline(my.acceptableTypes);
    const multiple = acceptableOptionalBoolean(my.multiple);
    return html2`<label class="SNS PseudoFileInput">
        <div style="
          -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
          background-color:${Color};
        "></div>
        <input type="file" style="display:none"
          multiple=${multiple} accept=${acceptableTypes}
          onInput=${onInput}
        />
      </label>`;
  };
}, `
/**** PseudoFileInput ****/

  .SNS.Sticker > .SNS.PseudoFileInput > div {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  `);
registerBehavior("native Controls", "File Drop Area", "FileDropArea", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 80 },
  Value: null,
  activeScript: `
  useBehavior('FileDropArea')
//my.Value           = ''
//my.Placeholder     = undefined
//my.acceptableTypes = undefined
//my.multiple        = false
//onInput(() => ...)
//onDrop(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event, Event.files);
    }
  }
  function onDragEnter(Event) {
    return consumingEvent(Event);
  }
  function onDragOver(Event) {
    return consumingEvent(Event);
  }
  function onDrop(Event) {
    consumeEvent(Event);
    if (my.Enabling == false) {
      return;
    }
    my.Value = Event.target.value;
    if (typeof my._onDrop === "function") {
      my._onDrop(Event, Event.dataTransfer.files);
    }
  }
  my.Renderer = () => {
    const Placeholder = acceptableTextline(my.Placeholder, "").trim();
    const acceptableTypes = acceptableOptionalTextline(my.acceptableTypes);
    const multiple = acceptableOptionalBoolean(my.multiple);
    return html2`<label class="SNS FileDropArea"
        onDragEnter=${onDragEnter} onDragOver=${onDragOver} onDrop=${onDrop}>
        <input type="file"
          multiple=${multiple} accept=${acceptableTypes}
          onInput=${onInput}
        />
        <span>${Placeholder}</span>
      </label>`;
  };
}, `
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
  `);
registerBehavior("native Controls", "Search Input", "SearchInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
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
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableTextline(my.Value, "");
    const Placeholder = acceptableOptionalTextline(my.Placeholder);
    const readonly = acceptableOptionalBoolean(my.readonly);
    const minLength = acceptableOptionalOrdinal(my.minLength);
    const maxLength = acceptableOptionalOrdinal(my.maxLength);
    const Pattern = acceptableOptionalTextline(my.Pattern);
    const SpellChecking = acceptableOptionalBoolean(my.SpellChecking);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      ValueIsTextline
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="search" class="SNS SearchInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readonly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** SearchInput ****/

  .SNS.Sticker > .SNS.SearchInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.SearchInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
registerBehavior("native Controls", "Color Input", "ColorInput", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('ColorInput')
//my.Value       = ''
//my.Suggestions = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableOptionalColor(my.Value);
    const Suggestions = acceptableOptionalListSatisfying(
      my.Suggestions,
      void 0,
      ValueIsColor
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    let SuggestionList = "", SuggestionId;
    if (Suggestions != null && Suggestions.length > 0) {
      SuggestionId = my.Id + "-Suggestions";
      SuggestionList = html2`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value2) => html2`<option value=${Value2}></option>`)}
        </datalist>`;
    }
    return html2`<input type="color" class="SNS ColorInput"
        value=${Value}
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
  };
}, `
/**** ColorInput ****/

  .SNS.Sticker > .SNS.ColorInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  `);
registerBehavior("native Controls", "DropDown", "DropDown", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('DropDown')
//my.Value   = '...'
//my.Options = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableTextline(my.Value, "");
    const Options = acceptableListSatisfying(
      my.Options,
      [],
      ValueIsTextline
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    return html2`<select class="SNS DropDown"
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
      >${Options.map(
      (Option) => {
        const OptionValue = Option.replace(/:.*$/, "").trim();
        const OptionLabel = Option.replace(/^[^:]+:/, "").trim();
        return html2`<option value=${OptionValue} selected=${OptionValue === Value}>
            ${OptionLabel}
          </option>`;
      }
    )}</select>`;
  };
}, `
/**** DropDown ****/

  .SNS.Sticker > .SNS.DropDown {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.SearchInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
registerBehavior("native Controls", "Pseudo DropDown", "PseudoDropDown", {
  Geometry: { x: 20, y: 20, Width: 24, Height: 24 },
  Value: null,
  activeScript: `
  useBehavior('PseudoDropDown')
//my.Value   = '...'
//my.Icon    = 'icon image url'
//my.Options = ['...',...]
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableTextline(my.Value, "");
    const Icon = acceptableURL(my.Icon, "/img/menu.png");
    const Color = acceptableColor(my.Color, "black");
    const Options = acceptableListSatisfying(
      my.Options,
      [],
      ValueIsTextline
    );
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    return html2`<div class="SNS PseudoDropDown">
        <div style="
          -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
          background-color:${Color};
        "></div>
        <select disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}>
          ${Options.map((Option) => {
      const OptionValue = Option.replace(/:.*\$/, "").trim();
      const OptionLabel = Option.replace(/^[^:]+:/, "").trim();
      return html2`<option value=${OptionValue} selected=${OptionValue === Value}>
              ${OptionLabel}
            </option>`;
    })}
        </select>
      </div>`;
  };
}, `
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
  `);
registerBehavior("native Controls", "Text Input", "TextInput", {
  Geometry: { x: 20, y: 20, Width: 100, Height: 30 },
  Value: null,
  activeScript: `
  useBehavior('TextInput')
//my.Value         = ''
//my.Placeholder   = undefined
//my.readonly      = false
//my.minLength     = 0
//my.maxLength     = undefined
//my.LineWrapping  = false
//my.SpellChecking = undefined
//onInput(() => ...)
`
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.ValueToShow = "";
  function onInput(Event) {
    if (my.Enabling == false) {
      return consumingEvent(Event);
    }
    my.Value = Event.target.value;
    if (typeof my._onInput === "function") {
      my._onInput(Event);
    }
  }
  function onBlur() {
    me.rerender();
  }
  my.Renderer = () => {
    let Value = acceptableTextline(my.Value, "");
    const Placeholder = acceptableOptionalTextline(my.Placeholder);
    const readonly = acceptableOptionalBoolean(my.readonly);
    const minLength = acceptableOptionalOrdinal(my.minLength);
    const maxLength = acceptableOptionalOrdinal(my.maxLength);
    const LineWrapping = acceptableOptionalBoolean(my.LineWrapping);
    const SpellChecking = acceptableOptionalBoolean(my.SpellChecking);
    if (document.activeElement === my.View) {
      Value = my.ValueToShow;
    } else {
      my.ValueToShow = Value;
    }
    return html2`<textarea class="SNS TextInput"
        value=${Value} minlength=${minLength} maxlength=${maxLength}
        readonly=${readonly} placeholder=${Placeholder}
        spellcheck=${SpellChecking} style="resize:none; ${LineWrapping == true ? "white-space:pre; overflow-wrap:break-word; hyphens:auto" : void 0}"
        disabled=${my.Enabling == false} onInput=${onInput} onBlur=${onBlur}
        value=${Value}
      />`;
  };
}, `
/**** TextInput ****/

  .SNS.Sticker > .SNS.TextInput {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .SNS.Sticker > .SNS.TextInput:readonly {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
registerBehavior("basic Shapes", "Line", "Line");
registerBehavior("basic Shapes", "Polyline", "Polyline");
registerBehavior("basic Shapes", "Arc", "Arc");
registerBehavior("basic Shapes", "quadratic Bezier", "quadraticBezier");
registerBehavior("basic Shapes", "cubic Bezier", "cubicBezier");
registerBehavior("basic Shapes", "Box", "Box");
registerBehavior("basic Shapes", "rounded Box", "roundedBox");
registerBehavior("basic Shapes", "Oval", "Oval");
registerBehavior("basic Shapes", "Chord", "Chord");
registerBehavior("basic Shapes", "Pie", "Pie");
registerBehavior("basic Shapes", "Polygon", "Polygon");
registerBehavior("basic Shapes", "regular Polygon", "regularPolygon");
registerBehavior("straight Arrows", "nw", "straightArrow_nw", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M ${Width},${Height}, L 0,0"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
registerBehavior("straight Arrows", "n", "straightArrow_n", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M ${Width / 2},${Height}, L ${Width / 2},0"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
registerBehavior("straight Arrows", "ne", "straightArrow_ne", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M 0,${Height}, L ${Width},0"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
registerBehavior("straight Arrows", "e", "straightArrow_e", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M 0,${Height / 2}, L ${Width},${Height / 2}"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
registerBehavior("straight Arrows", "se", "straightArrow_se", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M 0,0, L ${Width},${Height}"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
registerBehavior("straight Arrows", "s", "straightArrow_s", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M ${Width / 2},0, L ${Width / 2},${Height}"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
registerBehavior("straight Arrows", "sw", "straightArrow_sw", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M ${Width},0, L 0,${Height}"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
registerBehavior("straight Arrows", "w", "straightArrow_w", {
  Geometry: { x: 20, y: 20, Width: 40, Height: 40 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M ${Width},${Height / 2}, L 0,${Height / 2}"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** straight Arrows ****/

  .SNS.straightArrow {
    overflow:visible;
  }
  `);
registerBehavior("curved Arrows", "cw n", "curvedArrow_cw_n", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M ${Width},${Height - 6}, A ${Width - 6} ${Height - 18} 0 0 1 6 12"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
registerBehavior("curved Arrows", "cw e", "curvedArrow_cw_e", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M 6,${Height}, A ${Width - 18} ${Height - 6} 0 0 1 ${Width - 12} 6"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
registerBehavior("curved Arrows", "cw s", "curvedArrow_cw_s", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M 0,6, A ${Width - 6} ${Height - 18} 0 0 1 ${Width - 6} ${Height - 12}"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
registerBehavior("curved Arrows", "cw w", "curvedArrow_cw_w", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M ${Width - 6},0, A ${Width - 18} ${Height - 6} 0 0 1 12 ${Height - 6}"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
registerBehavior("curved Arrows", "ccw n", "curvedArrow_ccw_n", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M 0,${Height - 6}, A ${Width - 6} ${Height - 18} 0 0 0 ${Width - 6} 12"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
registerBehavior("curved Arrows", "ccw e", "curvedArrow_ccw_e", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M 6,0, A ${Width - 18} ${Height - 6} 0 0 0 ${Width - 12} ${Height - 6}"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
registerBehavior("curved Arrows", "ccw s", "curvedArrow_ccw_s", {
  Geometry: { x: 20, y: 20, Width: 50, Height: 60 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M ${Width},6, A ${Width - 6} ${Height - 18} 0 0 0 6 ${Height - 12}"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
registerBehavior("curved Arrows", "ccw w", "curvedArrow_ccw_w", {
  Geometry: { x: 20, y: 20, Width: 60, Height: 50 }
}, (me, my, html2, reactively, onRender, onMount, onUnmount) => {
  my.Renderer = function() {
    const { Width, Height } = my.Geometry;
    const Color = my.ForegroundColor || "black";
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
            d="M ${Width - 6},${Height}, A ${Width - 18} ${Height - 8} 0 0 0 12 6"
          />
        </svg>
      `;
    const DataURL = "data:image/svg+xml;base64," + btoa(SVGSource);
    return html2`<img class="SNS straightArrow" src=${DataURL}/>`;
  };
}, `
/**** curved Arrows ****/

  .SNS.curvedArrow {
    overflow:visible;
  }
  `);
registerBehavior("complex Controls", "flat List View", "FlatListView");
registerBehavior("complex Controls", "nested List View", "NestedListView");
registerBehavior("complex Controls", "QR-Code View", "QRCodeView");
function CSSStyleOfVisual(Visual) {
  expectVisual("visual", Visual);
  let CSSStyleList = [];
  const {
    BackgroundColor,
    BackgroundTexture,
    ForegroundColor,
    FontFamily,
    FontSize,
    FontWeight,
    FontStyle,
    LineHeight
  } = Visual;
  if (BackgroundColor != null) {
    CSSStyleList.push(`background-color:${BackgroundColor}`);
  }
  if (BackgroundTexture != null) {
    CSSStyleList.push(
      `background-image:${BackgroundTexture}; background-repeat:repeat`
    );
  }
  if (ForegroundColor != null) {
    CSSStyleList.push(`color:${ForegroundColor}`);
  }
  if (FontFamily != null) {
    CSSStyleList.push(`font-family:${FontFamily}`);
  }
  if (FontSize != null) {
    CSSStyleList.push(`font-size:${FontSize}px`);
  }
  if (FontWeight != null) {
    CSSStyleList.push(`font-weight:${FontWeight}`);
  }
  if (FontStyle != null) {
    CSSStyleList.push(`font-style:${FontStyle}`);
  }
  if (LineHeight != null) {
    CSSStyleList.push(`line-height:${LineHeight}px`);
  }
  return CSSStyleList.join(";");
}
function consumeEvent(Event) {
  Event.stopPropagation();
  Event.preventDefault();
}
const consumingEvent = consumeEvent;
class SNS_Visual {
  constructor(Project, Id) {
    // IMPORTANT: SNS_Project constructor will pass "undefined" as "Project"
    /**** Id - for internal use only ****/
    __publicField(this, "_Id");
    /**** Name ****/
    __publicField(this, "_Name");
    /**** Project ****/
    __publicField(this, "_Project");
    /**** Folder ****/
    __publicField(this, "_Folder");
    /**** BackgroundColor ****/
    __publicField(this, "_BackgroundColor");
    /**** BackgroundTexture ****/
    __publicField(this, "_BackgroundTexture");
    /**** FontFamily ****/
    __publicField(this, "_FontFamily");
    /**** FontSize ****/
    __publicField(this, "_FontSize");
    /**** FontWeight ****/
    __publicField(this, "_FontWeight");
    /**** FontStyle ****/
    __publicField(this, "_FontStyle");
    /**** LineHeight ****/
    __publicField(this, "_LineHeight");
    /**** ForegroundColor ****/
    __publicField(this, "_ForegroundColor");
    /**** Value ****/
    __publicField(this, "_Value", null);
    /**** observed ****/
    // @ts-ignore TS2564 allow "_observed" to be assigned upon first use
    __publicField(this, "_observed");
    /**** unobserved ****/
    // @ts-ignore TS2564 allow "_unobserved" to be assigned upon first use
    __publicField(this, "_unobserved");
    /**** activeScript ****/
    __publicField(this, "_activeScript");
    /**** pendingScript ****/
    __publicField(this, "_pendingScript");
    /**** ScriptError - for internal use only ****/
    __publicField(this, "_ScriptError");
    /**** Renderer ****/
    __publicField(this, "_Renderer");
    /**** View ****/
    __publicField(this, "_View");
    /**** onMount ****/
    __publicField(this, "_onMount");
    /**** onUnmount ****/
    __publicField(this, "_onUnmount");
    /**** Error - for internal use only ****/
    __publicField(this, "_Error");
    this._Project = Project;
    this._Id = Id || newId();
  }
  get Id() {
    return this._Id;
  }
  set Id(_) {
    throwReadOnlyError("Id");
  }
  get Name() {
    return this._Name;
  }
  set Name(newName) {
    allowName("visual name", newName);
    if (newName != null) {
      newName = newName.trim();
      if (newName === "") {
        newName = void 0;
      }
    }
    if (this._Name !== newName) {
      this._Name = newName;
      this._reportChange("configure", this, "Name", newName);
      this.rerender();
    }
  }
  get Project() {
    return this._Project;
  }
  set Project(_) {
    throwReadOnlyError("Project");
  }
  get Folder() {
    return this._Folder;
  }
  set Folder(_) {
    throwReadOnlyError("Folder");
  }
  /**** isAttached ****/
  get isAttached() {
    return this._Folder == null ? ValueIsProject(this) : this._Folder.isAttached;
  }
  set isAttached(_) {
    throwReadOnlyError("isAttached");
  }
  get BackgroundColor() {
    return this._BackgroundColor == null ? this._Folder == null ? void 0 : this._Folder.BackgroundColor : this._BackgroundColor;
  }
  set BackgroundColor(newColor) {
    allowColor("visual background color", newColor);
    if (this._BackgroundColor !== newColor) {
      this._BackgroundColor = newColor;
      this._reportChange("configure", this, "BackgroundColor", newColor);
      this.rerender();
    }
  }
  get BackgroundTexture() {
    return this._BackgroundTexture == null ? this._Folder == null ? void 0 : this._Folder.BackgroundTexture : this._BackgroundTexture;
  }
  set BackgroundTexture(newTexture) {
    allowURL("visual background texture", newTexture);
    if (this._BackgroundTexture !== newTexture) {
      this._BackgroundTexture = newTexture;
      this._reportChange("configure", this, "BackgroundTexture", newTexture);
      this.rerender();
    }
  }
  get FontFamily() {
    return this._FontFamily == null ? this._Folder == null ? void 0 : this._Folder.FontFamily : this._FontFamily;
  }
  set FontFamily(newFontFamily) {
    allowTextline("visual font family", newFontFamily);
    if (this._FontFamily !== newFontFamily) {
      this._FontFamily = newFontFamily;
      this._reportChange("configure", this, "FontFamily", newFontFamily);
      this.rerender();
    }
  }
  get FontSize() {
    return this._FontSize == null ? this._Folder == null ? void 0 : this._Folder.FontSize : this._FontSize;
  }
  set FontSize(newFontSize) {
    allowOrdinal("visual font size", newFontSize);
    if (this._FontSize !== newFontSize) {
      this._FontSize = newFontSize;
      this._reportChange("configure", this, "FontSize", newFontSize);
      this.rerender();
    }
  }
  get FontWeight() {
    return this._FontWeight == null ? this._Folder == null ? void 0 : this._Folder.FontWeight : this._FontWeight;
  }
  set FontWeight(newFontWeight) {
    allowIntegerInRange("visual font weight", newFontWeight, 1, 1e3);
    if (this._FontWeight !== newFontWeight) {
      this._FontWeight = newFontWeight;
      this._reportChange("configure", this, "FontWeight", newFontWeight);
      this.rerender();
    }
  }
  get FontStyle() {
    return this._FontStyle == null ? this._Folder == null ? void 0 : this._Folder.FontStyle : this._FontStyle;
  }
  set FontStyle(newFontStyle) {
    allowOneOf("visual font style", newFontStyle, SNS_FontStyles);
    if (this._FontStyle !== newFontStyle) {
      this._FontStyle = newFontStyle;
      this._reportChange("configure", this, "FontStyle", newFontStyle);
      this.rerender();
    }
  }
  get LineHeight() {
    return this._LineHeight == null ? this._Folder == null ? void 0 : this._Folder.LineHeight : this._LineHeight;
  }
  set LineHeight(newLineHeight) {
    allowOrdinal("visual line height", newLineHeight);
    if (this._LineHeight !== newLineHeight) {
      this._LineHeight = newLineHeight;
      this._reportChange("configure", this, "LineHeight", newLineHeight);
      this.rerender();
    }
  }
  get ForegroundColor() {
    return this._ForegroundColor == null ? this._Folder == null ? void 0 : this._Folder.ForegroundColor : this._ForegroundColor;
  }
  set ForegroundColor(newForegroundColor) {
    allowColor("visual foreground color", newForegroundColor);
    if (this._ForegroundColor !== newForegroundColor) {
      this._ForegroundColor = newForegroundColor;
      this._reportChange("configure", this, "ForegroundColor", newForegroundColor);
      this.rerender();
    }
  }
  /**** Color ****/
  get Color() {
    return this.ForegroundColor;
  }
  set Color(newColor) {
    this.ForegroundColor = newColor;
  }
  get Value() {
    return this._Value;
  }
  set Value(newValue) {
    if (ValuesDiffer$1(this._Value, newValue)) {
      this._Value = newValue;
      this._reportChange("configure", this, "Value", newValue);
      this.rerender();
    }
  }
  /**** editableValue (may be overwritten) ****/
  get editableValue() {
    return this._Value == null ? "" : "" + this._Value;
  }
  // stringify non-literal values before returning them
  set editableValue(newValue) {
    this.Value = newValue;
  }
  get observed() {
    if (this._observed == null) {
      this._observed = observe({});
    }
    return this._observed;
  }
  set observed(_) {
    throwReadOnlyError("observed");
  }
  get unobserved() {
    if (this._unobserved == null) {
      this._unobserved = {};
    }
    return this._unobserved;
  }
  set unobserved(_) {
    throwReadOnlyError("unobserved");
  }
  /**** Script ****/
  get Script() {
    return this._pendingScript == null ? this._activeScript : this._pendingScript;
  }
  set Script(_) {
    throwReadOnlyError("Script");
  }
  get activeScript() {
    return this._activeScript;
  }
  set activeScript(newScript) {
    allowText("visual script", newScript);
    if (newScript === "") {
      newScript = void 0;
    }
    if (this._activeScript !== newScript) {
      this._activeScript = newScript;
      this._reportChange("configure", this, "activeScript", newScript);
      this.rerender();
    }
  }
  get pendingScript() {
    return this._pendingScript;
  }
  set pendingScript(newScript) {
    allowText("visual script", newScript);
    if (this._pendingScript !== newScript) {
      this._pendingScript = newScript;
      this._reportChange("configure", this, "pendingScript", newScript);
      this.rerender();
    }
  }
  /**** activateScript ****/
  activateScript() {
    let activeScript = (this._activeScript || "").trim();
    this.Error = void 0;
    this._Renderer = void 0;
    unregisterAllReactiveFunctionsFrom(this);
    if (activeScript != null) {
      let compiledScript;
      try {
        compiledScript = new Function(
          "me,my, html,reactively, onRender,onMount,onUnmount, useBehavior",
          activeScript
        );
      } catch (Signal) {
        console.error("visual script compilation failure", Signal);
        this.Error = {
          Type: "Script Compilation Failure",
          Message: "" + Signal,
          Cause: Signal
        };
        return;
      }
      const reactively = (reactiveFunction) => {
        expectFunction("reactive function", reactiveFunction);
        registerReactiveFunctionIn(this, computed(reactiveFunction));
      };
      const onRender = this.onRender.bind(this);
      const onMount = this.onMount.bind(this);
      const onUnmount = this.onUnmount.bind(this);
      try {
        compiledScript.call(
          this,
          this,
          this,
          m,
          reactively,
          onRender,
          onMount,
          onUnmount,
          useBehavior.bind(this)
        );
      } catch (Signal) {
        console.error("visual script execution failure", Signal);
        this.Error = {
          Type: "Script Execution Failure",
          Message: "" + Signal,
          Cause: Signal
        };
        return;
      }
    }
    this.rerender();
  }
  get ScriptError() {
    return this._ScriptError == null ? void 0 : { ...this._ScriptError };
  }
  set ScriptError(newScriptError) {
    allowError("script error setting", newScriptError);
    if (ValuesDiffer$1(this._ScriptError, newScriptError)) {
      this._ScriptError = newScriptError;
      this._reportChange("configure", this, "ScriptError", newScriptError);
      this.rerender();
    }
  }
  get Renderer() {
    return this._Renderer;
  }
  set Renderer(newRenderer) {
    allowFunction("visual renderer", newRenderer);
    if (this._Renderer !== newRenderer) {
      this._Renderer = newRenderer;
      this.rerender();
    }
  }
  /**** onRender ****/
  onRender(newRenderer) {
    this.Renderer = newRenderer;
  }
  /**** Rendering (to be overwritten) ****/
  // @ts-ignore TS2564 allow "PropSet" to be never read
  Rendering(PropSet) {
    return "";
  }
  /**** rerender (to be overwritten) ****/
  // @ts-ignore TS2564 allow "Board" and "Sticker" to be never read
  rerender(Board, Sticker) {
  }
  get View() {
    return this._View;
  }
  set View(_) {
    throwReadOnlyError("View");
  }
  /**** isMounted ****/
  get isMounted() {
    return this._View != null;
  }
  set isMounted(_) {
    throwReadOnlyError("isMounted");
  }
  onMount(newCallback) {
    allowFunction('"onMount" callback', newCallback);
    if (newCallback == null) {
      this._onMount = void 0;
    } else {
      this._onMount = () => {
        try {
          newCallback.call(this);
        } catch (Signal) {
          this.Error = {
            Type: '"onMount" Callback Failure',
            Message: "" + Signal,
            Cause: Signal
          };
          this.rerender();
        }
      };
    }
  }
  onUnmount(newCallback) {
    allowFunction('"onUnmount" callback', newCallback);
    if (newCallback == null) {
      this._onUnmount = void 0;
    } else {
      this._onUnmount = () => {
        try {
          newCallback.call(this);
        } catch (Signal) {
          this.Error = {
            Type: '"onUnmount" Callback Failure',
            Message: "" + Signal,
            Cause: Signal
          };
        }
      };
    }
  }
  get Error() {
    return this._Error == null ? void 0 : { ...this._Error };
  }
  set Error(newError) {
    allowError("error setting", newError);
    if (ValuesDiffer$1(this._Error, newError)) {
      this._Error = newError;
      this._reportChange("configure", this, "Error", newError);
      this.rerender();
    }
  }
  /**** hasError ****/
  get hasError() {
    return this._Error != null;
  }
  set hasError(_) {
    throwReadOnlyError("hasError");
  }
  /**** _reportChange ****/
  /* protected */
  _reportChange(Change, ...ArgList) {
    this._Project._reportChange(Change, ...ArgList);
  }
  /**** _serializeConfigurationInto ****/
  _serializeConfigurationInto(Serialization) {
    Serialization.Id = this.Id;
    const serializeProperty = (Name) => {
      if (this["_" + Name] != null) {
        Serialization[Name] = this[Name];
      }
    };
    [
      "Name",
      "BackgroundColor",
      "BackgroundTexture",
      "FontFamily",
      "FontSize",
      "FontWeight",
      "FontStyle",
      "LineHeight",
      "ForegroundColor",
      "Value",
      "activeScript",
      "pendingScript"
    ].forEach((Name) => serializeProperty(Name));
  }
  /**** _deserializeConfigurationFrom ****/
  _deserializeConfigurationFrom(Serialization) {
    const deserializeProperty = (Name) => {
      if (Serialization[Name] != null) {
        try {
          this[Name] = Serialization[Name];
        } catch (Signal) {
          console.warn(
            "DeserializationError:invalid value for property " + quoted(Name)
          );
        }
      }
    };
    deserializeProperty("activeScript");
    [
      "Name",
      "BackgroundColor",
      "BackgroundTexture",
      "FontFamily",
      "FontSize",
      "FontWeight",
      "FontStyle",
      "LineHeight",
      "ForegroundColor",
      "Value",
      "pendingScript"
    ].forEach((Name) => deserializeProperty(Name));
  }
  // deserializing "activeScript" also automatically activates that script
}
class SNS_Folder extends SNS_Visual {
  constructor(Project, Id) {
    super(Project, Id);
    /**** SnapToGrid - inherited from outer folders ****/
    __publicField(this, "_SnapToGrid");
    /**** GridWidth ****/
    __publicField(this, "_GridWidth");
    /**** GridHeight ****/
    __publicField(this, "_GridHeight");
    /**** BoardList ****/
    __publicField(this, "_BoardList", []);
  }
  // IMPORTANT: SNS_Project constructor will pass "undefined" as "Project"
  /**** Path ****/
  get Path() {
    const outerFolder = this._Folder;
    if (outerFolder == null) {
      return "|";
    } else {
      const localPath = this.Name || "#" + this.Index;
      const outerPath = outerFolder.Path;
      return (outerPath === "|" ? "" : outerPath) + "|" + localPath;
    }
  }
  set Path(_) {
    throwReadOnlyError("Path");
  }
  /**** BoardAtPath ****/
  BoardAtPath(Path) {
    expectTextline("board path", Path);
    Path = Path.trim();
    if (Path === "") {
      return this._Folder == null ? void 0 : this;
    }
    if (Path.startsWith("|")) {
      return this._Project.BoardAtPath(Path.replace(/^(\s*\|)*/, ""));
    }
    Path = Path.replace(/\|+/g, "|");
    const splitPath = Path.split("|").map(
      (Element) => Element.trim()
      // eliminate leading/trailing ws
    ).map(
      (Element) => /^#\d+$/.test(Element) ? parseInt(Element.slice(1), 10) : Element
    );
    let Result;
    for (let i = 0, l = splitPath.length; i < l; i++) {
      const Element = splitPath[i];
      if (typeof Element === "number") {
        Result = (Result || this).BoardAt(Element);
      } else {
        Result = (Result || this).BoardNamed(Element);
      }
      if (Result == null) {
        return void 0;
      }
    }
    return Result;
  }
  /**** IndexPath ****/
  get IndexPath() {
    const outerFolder = this._Folder;
    if (outerFolder == null) {
      return [];
    } else {
      return outerFolder.IndexPath.concat(this.Index);
    }
  }
  set IndexPath(_) {
    throwReadOnlyError("IndexPath");
  }
  get SnapToGrid() {
    return !this._SnapToGrid ? this._Folder == null ? false : this._Folder.SnapToGrid : this._SnapToGrid == true;
  }
  set SnapToGrid(newSetting) {
    allowBoolean("snap-to-grid setting", newSetting);
    if (this._SnapToGrid !== newSetting) {
      this._SnapToGrid = newSetting;
      this._reportChange("configure", this, "SnapToGrid", newSetting);
      this.rerender();
    }
  }
  get GridWidth() {
    return this._GridWidth == null ? this._Folder == null ? defaultGridWidth : this._Folder.GridWidth : this._GridWidth;
  }
  set GridWidth(newWidth) {
    allowCardinal("snap-to-grid width", newWidth);
    if (this._GridWidth !== newWidth) {
      this._GridWidth = newWidth;
      this._reportChange("configure", this, "GridWidth", newWidth);
      this.rerender();
    }
  }
  get GridHeight() {
    return this._GridHeight == null ? this._Folder == null ? defaultGridHeight : this._Folder.GridHeight : this._GridHeight;
  }
  set GridHeight(newHeight) {
    allowCardinal("snap-to-grid height", newHeight);
    if (this._GridHeight !== newHeight) {
      this._GridHeight = newHeight;
      this._reportChange("configure", this, "GridHeight", newHeight);
      this.rerender();
    }
  }
  /**** Index ****/
  get Index() {
    return this._Folder == null ? -1 : this._Folder.IndexOfBoard(this);
  }
  set Index(_) {
    throwReadOnlyError("Index");
  }
  /**** mayBeShiftedUp ****/
  get mayBeShiftedUp() {
    return this._Folder == null ? false : this._Folder.mayShiftBoardUp(this);
  }
  set mayBeShiftedUp(_) {
    throwReadOnlyError("mayBeShiftedUp");
  }
  /**** mayBeShiftedDown ****/
  get mayBeShiftedDown() {
    return this._Folder == null ? false : this._Folder.mayShiftBoardDown(this);
  }
  set mayBeShiftedDown(_) {
    throwReadOnlyError("mayBeShiftedDown");
  }
  /**** mayBeShiftedIn ****/
  get mayBeShiftedIn() {
    return this._Folder == null ? false : this._Folder.mayShiftBoardIn(this);
  }
  set mayBeShiftedIn(_) {
    throwReadOnlyError("mayBeShiftedIn");
  }
  /**** mayBeShiftedOut ****/
  get mayBeShiftedOut() {
    return this._Folder == null ? false : this._Folder.mayShiftBoardOut(this);
  }
  set mayBeShiftedOut(_) {
    throwReadOnlyError("mayBeShiftedOut");
  }
  /**** containsFolder ****/
  containsFolder(Folder) {
    expectFolder("folder", Folder);
    Folder = Folder.Folder;
    while (Folder != null) {
      if (Folder === this) {
        return true;
      }
      Folder = Folder.Folder;
    }
    return false;
  }
  get BoardList() {
    return this._BoardList.slice();
  }
  set BoardList(_) {
    throwReadOnlyError("BoardList");
  }
  /**** BoardCount ****/
  get BoardCount() {
    return this._BoardList.length;
  }
  set BoardCount(_) {
    throwReadOnlyError("BoardCount");
  }
  /**** IndexOfBoard ****/
  IndexOfBoard(BoardOrNameOrIndex) {
    const Board = this.Board(BoardOrNameOrIndex);
    if (Board == null) {
      return -1;
    }
    return this._BoardList.indexOf(Board);
  }
  /**** Board ****/
  Board(BoardOrNameOrIndex) {
    expectValue("board, name or index", BoardOrNameOrIndex);
    switch (true) {
      case ValueIsBoard(BoardOrNameOrIndex):
        const Board = BoardOrNameOrIndex;
        return Board._Folder === this ? Board : void 0;
      case ValueIsInteger(BoardOrNameOrIndex):
        let Index = BoardOrNameOrIndex;
        if (Index < 0) {
          Index += this._BoardList.length;
        }
        return this._BoardList[Index];
      case ValueIsName(BoardOrNameOrIndex):
        return this.BoardNamed(BoardOrNameOrIndex);
    }
    throwError(
      "InvalidArgument: no valid board, board name or board index given"
    );
  }
  /**** existingBoard ****/
  existingBoard(BoardOrNameOrIndex) {
    let Board = this.Board(BoardOrNameOrIndex);
    if (Board == null)
      throwError(
        "BoardNotFound: the desired board could not be found"
      );
    return Board;
  }
  /**** BoardNamed ****/
  BoardNamed(Name) {
    expectName("SNS board name", Name);
    Name = Name.trim().toLowerCase();
    let Result = void 0;
    this._BoardList.forEach((Board) => {
      if (Result == null && Board.Name != null && Board.Name.toLowerCase() === Name) {
        Result = Board;
      }
    });
    return Result;
  }
  /**** BoardAt ****/
  BoardAt(Index) {
    expectInteger("SNS board index", Index);
    if (Index < 0) {
      Index += this._BoardList.length;
    }
    return this._BoardList[Index];
  }
  /**** hasBoard ****/
  hasBoard(BoardOrNameOrIndex) {
    return this.Board(BoardOrNameOrIndex) != null;
  }
  /**** newBoardAt ****/
  newBoardAt(Index, Id) {
    return Id == null ? this.BoardDeserializedAt({}, Index) : this.BoardDeserializedAt({ Id }, Index);
  }
  /**** BoardDeserializedAt - nota bene: needs explicit script activation! ****/
  BoardDeserializedAt(Serialization, Index) {
    expectSerializable("board serialization", Serialization);
    allowInteger("board insertionindex", Index);
    if (Index == null) {
      Index = this._BoardList.length;
    } else {
      if (Index < 0) {
        Index += this._BoardList.length;
      }
      Index = Math.max(0, Math.min(Index, this._BoardList.length));
    }
    const Id = allowedId("board id", Serialization.Id);
    let newBoard = new SNS_Board(this._Project, Id);
    this._attachBoardAt(newBoard, Index);
    newBoard._deserializeConfigurationFrom(Serialization);
    newBoard._deserializeStickersFrom(Serialization);
    newBoard._deserializeBoardsFrom(Serialization);
    this.rerender();
    return newBoard;
  }
  /**** DuplicateOfBoardAt ****/
  DuplicateOfBoardAt(Index) {
    expectInteger("board index", Index);
    const Board = this.existingBoard(Index);
    const Serialization = Board.Serialization;
    removeIdsFrom(Serialization);
    return this.BoardDeserializedAt(Serialization, Index + 1);
  }
  /**** mayShiftBoardUp/Down ****/
  mayShiftBoardUp(BoardOrNameOrIndex) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    return this._BoardList.indexOf(Board) > 0;
  }
  mayShiftBoardDown(BoardOrNameOrIndex) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    const BoardList = this._BoardList;
    const BoardIndex = BoardList.indexOf(Board);
    return BoardIndex >= 0 && BoardIndex < BoardList.length - 1;
  }
  /**** shiftBoardToTop ****/
  shiftBoardToTop(BoardOrNameOrIndex) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    if (this.mayShiftBoardUp(Board)) {
      const oldIndex = this._BoardList.indexOf(Board);
      this._detachBoardAt(oldIndex);
      this._attachBoardAt(Board, 0);
      this.rerender();
    }
  }
  /**** shiftBoardUp ****/
  shiftBoardUp(BoardOrNameOrIndex) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    if (this.mayShiftBoardUp(Board)) {
      const oldIndex = this._BoardList.indexOf(Board);
      this._detachBoardAt(oldIndex);
      this._attachBoardAt(Board, oldIndex - 1);
      this.rerender();
    }
  }
  /**** shiftBoardDown ****/
  shiftBoardDown(BoardOrNameOrIndex) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    if (this.mayShiftBoardDown(Board)) {
      const oldIndex = this._BoardList.indexOf(Board);
      this._detachBoardAt(oldIndex);
      this._attachBoardAt(Board, oldIndex + 1);
      this.rerender();
    }
  }
  /**** shiftBoardToBottom ****/
  shiftBoardToBottom(BoardOrNameOrIndex) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    if (this.mayShiftBoardDown(Board)) {
      const oldIndex = this._BoardList.indexOf(Board);
      this._detachBoardAt(oldIndex);
      this._attachBoardAt(Board, this._BoardList.length);
      this.rerender();
    }
  }
  /**** shiftBoardTo ****/
  shiftBoardTo(BoardOrNameOrIndex, newIndex) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    expectInteger("SNS board index", newIndex);
    if (newIndex < 0) {
      newIndex += this._BoardList.length;
    }
    newIndex = Math.max(0, Math.min(newIndex, this._BoardList.length));
    const oldIndex = this._BoardList.indexOf(Board);
    if (oldIndex === newIndex) {
      return;
    }
    this._detachBoardAt(oldIndex);
    this._attachBoardAt(Board, newIndex);
    this.rerender();
  }
  /**** shiftBoardsByIndex ****/
  shiftBoardsByIndex(oldIndex, newIndex, Count) {
    const BoardCount = this._BoardList.length;
    expectIntegerInRange("old index", oldIndex, 0, BoardCount);
    expectIntegerInRange("new index", newIndex, 0, BoardCount);
    const BoardsToShift = this._BoardList.slice(oldIndex, oldIndex + Count);
    BoardsToShift.forEach((_) => this._detachBoardAt(oldIndex));
    if (newIndex > oldIndex) {
      newIndex -= Count;
    }
    BoardsToShift.forEach(
      (Board, i) => this._attachBoardAt(Board, newIndex + i)
    );
    this.rerender();
  }
  /**** mayShiftBoardIn/Out ****/
  mayShiftBoardIn(BoardOrNameOrIndex) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    return this.mayShiftBoardDown(Board);
  }
  mayShiftBoardOut(BoardOrNameOrIndex) {
    return this._Folder != null;
  }
  /**** shiftBoardIn ****/
  shiftBoardIn(BoardOrNameOrIndex) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    if (this.mayShiftBoardIn(Board)) {
      const oldIndex = this._BoardList.indexOf(Board);
      const newFolder = this._BoardList[oldIndex + 1];
      this._detachBoardAt(oldIndex);
      newFolder._attachBoardAt(Board, 0);
      this.rerender();
      newFolder.rerender();
    }
  }
  /**** shiftBoardOut ****/
  shiftBoardOut(BoardOrNameOrIndex) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    if (this.mayShiftBoardOut(Board)) {
      const oldIndex = this._BoardList.indexOf(Board);
      const newFolder = this._Folder;
      this._detachBoardAt(oldIndex);
      newFolder._attachBoardAt(Board, newFolder.Index);
      this.rerender();
      newFolder.rerender();
    }
  }
  /**** mayMoveBoardTo ****/
  mayMoveBoardTo(BoardOrNameOrIndex, FolderOrNameOrIndex, Index) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    const Folder = ValueIsFolder(FolderOrNameOrIndex) ? FolderOrNameOrIndex : this.existingBoard(FolderOrNameOrIndex);
    allowInteger("insertion index", Index);
    return Folder.isAttached && Folder !== Board && !Board.containsFolder(Folder);
  }
  /**** moveBoardTo ****/
  moveBoardTo(BoardOrNameOrIndex, FolderOrNameOrIndex, Index) {
    const Board = this.existingBoard(BoardOrNameOrIndex);
    const newFolder = ValueIsFolder(FolderOrNameOrIndex) ? FolderOrNameOrIndex : this.existingBoard(FolderOrNameOrIndex);
    allowInteger("insertion index", Index);
    if (newFolder.isAttached && newFolder !== Board && !Board.containsFolder(newFolder)) {
      const oldIndex = this._BoardList.indexOf(Board);
      let newIndex = Index == null ? newFolder.BoardCount : Index;
      if (newIndex < 0) {
        newIndex += newFolder.BoardCount;
      }
      newIndex = Math.max(0, Math.min(newIndex, newFolder.BoardCount));
      this._detachBoardAt(oldIndex);
      newFolder._attachBoardAt(Board, newIndex);
      this.rerender();
      newFolder.rerender();
    }
  }
  /**** destroyBoard ****/
  destroyBoard(BoardOrNameOrIndex) {
    const Board = this.Board(BoardOrNameOrIndex);
    if (Board == null) {
      if (ValueIsBoard(BoardOrNameOrIndex))
        throwError(
          "NoSuchBoard: the given board could not be found"
        );
      return;
    }
    Board.clear();
    unregisterAllReactiveFunctionsFrom(Board);
    const oldIndex = this._BoardList.indexOf(Board);
    this._detachBoardAt(oldIndex);
    unregisterFolder(Board);
    Board._Project = void 0;
    this._reportChange("destroyBoard", Board);
    this.rerender();
  }
  /**** clear ****/
  clear() {
    for (let i = 0, l = this._BoardList.length; i < l; i++) {
      this.destroyBoard(this._BoardList[0]);
    }
  }
  /**** Rendering ****/
  Rendering(PropSet) {
    if (this.hasError) {
      return ErrorRenderer.call(this);
    }
    let Renderer = this._Renderer;
    if (Renderer == null) {
      return "";
    }
    try {
      return Renderer.call(this, PropSet);
    } catch (Signal) {
      this.Error = {
        Type: "Rendering Failure",
        Message: "" + Signal,
        Cause: Signal
      };
      return ErrorRenderer.call(this);
    }
  }
  /**** _attachBoardAt ****/
  /* protected */
  _attachBoardAt(Board, Index) {
    Board._Folder = this;
    this._BoardList.splice(Index, 0, Board);
    this._reportChange("attachBoard", Board, this, Index);
  }
  /**** _detachBoardAt ****/
  /* protected */
  _detachBoardAt(Index) {
    const Board = this._BoardList.splice(Index, 1)[0];
    Board._Folder = void 0;
    this._reportChange("detachBoard", Board, this, Index);
  }
  /**** _serializeConfigurationInto ****/
  _serializeConfigurationInto(Serialization) {
    super._serializeConfigurationInto(Serialization);
    const serializeProperty = (Name) => {
      if (this["_" + Name] != null) {
        Serialization[Name] = this[Name];
      }
    };
    [
      "SnapToGrid",
      "GridWidth",
      "GridHeight"
    ].forEach((Name) => serializeProperty(Name));
  }
  /**** _deserializeConfigurationFrom ****/
  _deserializeConfigurationFrom(Serialization) {
    super._deserializeConfigurationFrom(Serialization);
    const deserializeProperty = (Name) => {
      if (Serialization[Name] != null) {
        try {
          this[Name] = Serialization[Name];
        } catch (Signal) {
          console.warn(
            "DeserializationError:invalid value for property " + quoted(Name)
          );
        }
      }
    };
    [
      "SnapToGrid",
      "GridWidth",
      "GridHeight"
    ].forEach((Name) => deserializeProperty(Name));
  }
  /**** _serializeBoardsInto ****/
  _serializeBoardsInto(Serialization) {
    const BoardList = this._BoardList.slice();
    if (BoardList.length > 0) {
      Serialization.BoardList = BoardList.map(
        (Board) => Board.Serialization
      );
    }
  }
  /**** _deserializeBoardsFrom ****/
  _deserializeBoardsFrom(Serialization) {
    const BoardList = this._BoardList;
    if (BoardList.length > 0) {
      this.clear();
    }
    if (ValueIsListSatisfying(Serialization.BoardList, ValueIsPlainObject) && Serialization.BoardList.length > 0) {
      Serialization.BoardList.forEach(
        (BoardSerialization, Index) => {
          this.BoardDeserializedAt(BoardSerialization, Index);
        }
      );
    }
  }
}
const SNS_ProjectPropertySet = /* @__PURE__ */ Object.create(null);
[
  "Name",
  "BackgroundColor",
  "BackgroundTexture",
  "FontFamily",
  "FontSize",
  "FontWeight",
  "FontStyle",
  "LineHeight",
  "ForegroundColor",
  "Value",
  "activeScript",
  "pendingScript",
  "SnapToGrid",
  "GridWidth",
  "GridHeight"
].forEach((Property) => SNS_ProjectPropertySet[Property] = true);
class SNS_Project extends SNS_Folder {
  constructor(Name) {
    super(void 0, void 0);
    /**** onChange ****/
    __publicField(this, "_onChange", []);
    /**** onRender ****/
    __publicField(this, "_onRender", []);
    /**** onError ****/
    __publicField(this, "_onError", []);
    this._Project = this;
    expectName("project name", Name);
    this._Name = Name;
  }
  /**** Name ****/
  get Name() {
    return this._Name;
  }
  set Name(_) {
    throwReadOnlyError("Name");
  }
  /**** IndexPath ****/
  get IndexPath() {
    return [];
  }
  set IndexPath(_) {
    throwReadOnlyError("IndexPath");
  }
  /**** BoardAtIndexPath ****/
  BoardAtIndexPath(IndexPath) {
    expectListSatisfying("board index path", IndexPath, ValueIsOrdinal);
    if (IndexPath.length === 0) {
      return void 0;
    } else {
      let Result;
      for (let i = 0, l = IndexPath.length; i < l; i++) {
        Result = (Result || this).BoardAt(IndexPath[i]);
        if (Result == null) {
          return void 0;
        }
      }
      return Result;
    }
  }
  /**** FolderWithId ****/
  FolderWithId(Id) {
    expectId("folder id", Id);
    return FolderWithId(this, Id);
  }
  /**** BoardWithId ****/
  BoardWithId(Id) {
    const Folder = FolderWithId(this, Id);
    if (ValueIsProject(Folder))
      throwError(
        "NotABoard: the folder with the given id is not a board, but the project"
      );
    return Folder;
  }
  /**** StickerWithId ****/
  StickerWithId(Id) {
    expectId("sticker id", Id);
    return StickerWithId(this, Id);
  }
  /**** recursivelyActivateAllScripts ****/
  recursivelyActivateAllScripts() {
    this.activateScript();
    this._BoardList.forEach(
      (Board) => Board.recursivelyActivateAllScripts()
    );
  }
  onChange(Callback) {
    expectFunction('"onChange" callback', Callback);
    this._onChange.push(Callback);
  }
  /**** _reportChange ****/
  /* protected */
  _reportChange(Change, Visual, ...ArgList) {
    if (Change === "configure") {
      Change = ValueIsFolder(Visual) ? "configureFolder" : "configureSticker";
    }
    ArgList.unshift(this, Change, Visual);
    this._onChange.forEach(
      // @ts-ignore TS2345 skip checking of individual "ArgList" elements
      (Callback) => Callback.apply(this, ArgList)
    );
  }
  onRender(Callback) {
    expectFunction('"onRender" callback', Callback);
    this._onRender.push(Callback);
  }
  /**** rerender ****/
  rerender(Board, Sticker) {
    this._onRender.forEach(
      (Callback) => Callback(this, Board, Sticker)
    );
  }
  onError(Callback) {
    expectFunction('"onError" callback', Callback);
    this._onError.push(Callback);
  }
  /**** showError ****/
  showError(Visual, Error2) {
    this._onError.forEach(
      (Callback) => Callback(this, Visual, Error2)
    );
  }
  /**** Serialization ****/
  get Serialization() {
    const Result = {};
    this._serializeConfigurationInto(Result);
    this._serializeBoardsInto(Result);
    delete Result.Id;
    return Result;
  }
  set Serialization(_) {
    throwReadOnlyError("Serialization");
  }
  /**** deserializedFrom - nota bene: needs explicit script activation! ****/
  static deserializedFrom(Name, Serialization) {
    expectName("project name", Name);
    const Result = new SNS_Project(Name);
    delete Serialization.Name;
    Result._Name = Name;
    Result._deserializeConfigurationFrom(Serialization);
    Result._deserializeBoardsFrom(Serialization);
    return Result;
  }
}
const SNS_BoardPropertySet = /* @__PURE__ */ Object.create(null);
[
  "Name",
  "BackgroundColor",
  "BackgroundTexture",
  "FontFamily",
  "FontSize",
  "FontWeight",
  "FontStyle",
  "LineHeight",
  "ForegroundColor",
  "Value",
  "activeScript",
  "pendingScript",
  "SnapToGrid",
  "GridWidth",
  "GridHeight"
].forEach((Property) => SNS_BoardPropertySet[Property] = true);
class SNS_Board extends SNS_Folder {
  /* protected */
  constructor(Project, Id) {
    super(Project, Id);
    /**** StickerList ****/
    __publicField(this, "_StickerList", []);
    registerFolder(Project, this);
    Project._reportChange("createBoard", this);
  }
  get StickerList() {
    return this._StickerList.slice();
  }
  set StickerList(_) {
    throwReadOnlyError("StickerList");
  }
  /**** StickerCount ****/
  get StickerCount() {
    return this._StickerList.length;
  }
  set StickerCount(_) {
    throwReadOnlyError("StickerCount");
  }
  /**** IndexOfSticker ****/
  IndexOfSticker(Sticker) {
    expectSticker("SNS sticker to search for", Sticker);
    return this._StickerList.indexOf(Sticker);
  }
  /**** Sticker ****/
  Sticker(StickerOrNameOrIndex) {
    expectValue("sticker, name or index", StickerOrNameOrIndex);
    switch (true) {
      case ValueIsSticker(StickerOrNameOrIndex):
        const Sticker = StickerOrNameOrIndex;
        return Sticker.Board === this ? Sticker : void 0;
      case ValueIsInteger(StickerOrNameOrIndex):
        const Index = StickerOrNameOrIndex;
        return this._StickerList[Index];
      case ValueIsName(StickerOrNameOrIndex):
        return this.StickerNamed(StickerOrNameOrIndex);
    }
    throwError(
      "InvalidArgument: no valid sticker, sticker name or sticker index given"
    );
  }
  /**** existingSticker ****/
  existingSticker(StickerOrNameOrIndex) {
    let Sticker = this.Sticker(StickerOrNameOrIndex);
    if (Sticker == null)
      throwError(
        "StickerNotFound: the desired sticker could not be found"
      );
    return Sticker;
  }
  /**** StickerNamed ****/
  StickerNamed(Name) {
    expectName("SNS sticker name", Name);
    Name = Name.trim().toLowerCase();
    let Result = void 0;
    this._StickerList.forEach((Sticker) => {
      if (Result == null && Sticker.Name != null && Sticker.Name.toLowerCase() === Name) {
        Result = Sticker;
      }
    });
    return Result;
  }
  /**** StickerAt ****/
  StickerAt(Index) {
    expectInteger("SNS sticker index", Index);
    if (Index < 0) {
      Index += this._StickerList.length;
    }
    return this._StickerList[Index];
  }
  /**** hasSticker ****/
  hasSticker(StickerOrNameOrIndex) {
    return this.Sticker(StickerOrNameOrIndex) != null;
  }
  /**** newStickerAt ****/
  newStickerAt(Index, Id) {
    return Id == null ? this.StickerDeserializedAt({}, Index) : this.StickerDeserializedAt({ Id }, Index);
  }
  /**** StickerDeserializedAt - nota bene: needs explicit script activation! ****/
  StickerDeserializedAt(Serialization, Index) {
    expectSerializable("sticker serialization", Serialization);
    allowInteger("SNS sticker index", Index);
    if (Index == null) {
      Index = this._StickerList.length;
    } else {
      if (Index < 0) {
        Index += this._StickerList.length;
      }
      Index = Math.max(0, Math.min(Index, this._StickerList.length));
    }
    const Id = allowedId("sticker id", Serialization.Id);
    let newSticker = new SNS_Sticker(this.Project, Id);
    this._attachStickerAt(newSticker, Index);
    newSticker._deserializeConfigurationFrom(Serialization);
    this.rerender();
    return newSticker;
  }
  /**** DuplicateOfStickerAt ****/
  DuplicateOfStickerAt(Index) {
    expectInteger("SNS sticker index", Index);
    const Sticker = this.existingSticker(Index);
    const Serialization = Sticker.Serialization;
    removeIdsFrom(Serialization);
    return this.StickerDeserializedAt(Serialization, Index + 1);
  }
  /**** mayShiftStickerUp/Down ****/
  mayShiftStickerUp(StickerOrNameOrIndex) {
    const Sticker = this.existingSticker(StickerOrNameOrIndex);
    return this._StickerList.indexOf(Sticker) > 0;
  }
  mayShiftStickerDown(StickerOrNameOrIndex) {
    const Sticker = this.existingSticker(StickerOrNameOrIndex);
    const StickerList = this._StickerList;
    const StickerIndex = StickerList.indexOf(Sticker);
    return StickerIndex >= 0 && StickerIndex < StickerList.length - 1;
  }
  /**** shiftStickerToTop ****/
  shiftStickerToTop(StickerOrNameOrIndex) {
    const Sticker = this.existingSticker(StickerOrNameOrIndex);
    if (this.mayShiftStickerUp(Sticker)) {
      const oldIndex = this._StickerList.indexOf(Sticker);
      this._detachStickerAt(oldIndex);
      this._attachStickerAt(Sticker, 0);
      this.rerender();
    }
  }
  /**** shiftStickerUp ****/
  shiftStickerUp(StickerOrNameOrIndex) {
    const Sticker = this.existingSticker(StickerOrNameOrIndex);
    if (this.mayShiftStickerUp(Sticker)) {
      const oldIndex = this._StickerList.indexOf(Sticker);
      this._detachStickerAt(oldIndex);
      this._attachStickerAt(Sticker, oldIndex - 1);
      this.rerender();
    }
  }
  /**** shiftStickerDown ****/
  shiftStickerDown(StickerOrNameOrIndex) {
    const Sticker = this.existingSticker(StickerOrNameOrIndex);
    if (this.mayShiftStickerDown(Sticker)) {
      const oldIndex = this._StickerList.indexOf(Sticker);
      this._detachStickerAt(oldIndex);
      this._attachStickerAt(Sticker, oldIndex + 1);
      this.rerender();
    }
  }
  /**** shiftStickerToBottom ****/
  shiftStickerToBottom(StickerOrNameOrIndex) {
    const Sticker = this.existingSticker(StickerOrNameOrIndex);
    if (this.mayShiftStickerDown(Sticker)) {
      const oldIndex = this._StickerList.indexOf(Sticker);
      this._detachStickerAt(oldIndex);
      this._attachStickerAt(Sticker, this._StickerList.length);
      this.rerender();
    }
  }
  /**** shiftStickerTo ****/
  shiftStickerTo(StickerOrNameOrIndex, newIndex) {
    const Sticker = this.existingSticker(StickerOrNameOrIndex);
    expectInteger("SNS sticker index", newIndex);
    if (newIndex < 0) {
      newIndex += this._StickerList.length;
    }
    newIndex = Math.max(0, Math.min(newIndex, this._StickerList.length - 1));
    const oldIndex = this._StickerList.indexOf(Sticker);
    if (oldIndex === newIndex) {
      return;
    }
    this._detachStickerAt(oldIndex);
    this._attachStickerAt(Sticker, newIndex);
    this.rerender();
  }
  /**** shiftStickersByIndex ****/
  shiftStickersByIndex(oldIndex, newIndex, Count) {
    const StickerCount = this._StickerList.length;
    expectIntegerInRange("old index", oldIndex, 0, StickerCount);
    expectIntegerInRange("new index", newIndex, 0, StickerCount);
    const StickersToShift = this._StickerList.slice(oldIndex, oldIndex + Count);
    StickersToShift.forEach((_) => this._detachStickerAt(oldIndex));
    if (newIndex > oldIndex) {
      newIndex -= Count;
    }
    StickersToShift.forEach(
      (Sticker, i) => this._attachStickerAt(Sticker, newIndex + i)
    );
    this.rerender();
  }
  /**** destroySticker ****/
  destroySticker(StickerOrNameOrIndex) {
    const Sticker = this.Sticker(StickerOrNameOrIndex);
    if (Sticker == null) {
      if (ValueIsSticker(StickerOrNameOrIndex))
        throwError(
          "NoSuchSticker: the given sticker could not be found"
        );
      return;
    }
    unregisterAllReactiveFunctionsFrom(Sticker);
    const oldIndex = this._StickerList.indexOf(Sticker);
    this._detachStickerAt(oldIndex);
    unregisterSticker(Sticker);
    Sticker._Project = void 0;
    this._reportChange("destroySticker", Sticker);
    this.rerender();
  }
  /**** clear ****/
  clear() {
    super.clear();
    for (let i = 0, l = this._StickerList.length; i < l; i++) {
      this.destroySticker(this._StickerList[0]);
    }
  }
  /**** recursivelyActivateAllScripts ****/
  recursivelyActivateAllScripts() {
    this.activateScript();
    this._BoardList.forEach(
      (Board) => Board.recursivelyActivateAllScripts()
    );
    this._StickerList.forEach(
      (Sticker) => Sticker.activateScript()
    );
  }
  /**** rerender ****/
  rerender() {
    this.Project.rerender(this);
  }
  /**** _attachStickerAt ****/
  /* protected */
  _attachStickerAt(Sticker, Index) {
    Sticker._Folder = this;
    this._StickerList.splice(Index, 0, Sticker);
    this._reportChange("attachSticker", Sticker, this, Index);
  }
  /**** _detachStickerAt ****/
  /* protected */
  _detachStickerAt(Index) {
    const Sticker = this._StickerList.splice(Index, 1)[0];
    Sticker._Folder = void 0;
    this._reportChange("detachSticker", Sticker, this, Index);
  }
  /**** Serialization ****/
  get Serialization() {
    const Result = {};
    this._serializeConfigurationInto(Result);
    this._serializeBoardsInto(Result);
    this._serializeStickersInto(Result);
    return Result;
  }
  set Serialization(_) {
    throwReadOnlyError("Serialization");
  }
  /**** _serializeStickersInto ****/
  _serializeStickersInto(Serialization) {
    const StickerList = this._StickerList.slice();
    if (StickerList.length > 0) {
      Serialization.StickerList = StickerList.map(
        (Sticker) => Sticker.Serialization
      );
    }
  }
  /**** _deserializeStickersFrom ****/
  _deserializeStickersFrom(Serialization) {
    const StickerList = this._StickerList;
    if (StickerList.length > 0) {
      this.clear();
    }
    if (ValueIsListSatisfying(Serialization.StickerList, ValueIsPlainObject) && Serialization.StickerList.length > 0) {
      Serialization.StickerList.forEach(
        (StickerSerialization, Index) => {
          this.StickerDeserializedAt(StickerSerialization, Index);
        }
      );
    }
  }
}
const SNS_StickerPropertySet = /* @__PURE__ */ Object.create(null);
[
  "Name",
  "BackgroundColor",
  "BackgroundTexture",
  "FontFamily",
  "FontSize",
  "FontWeight",
  "FontStyle",
  "LineHeight",
  "ForegroundColor",
  "Value",
  "activeScript",
  "pendingScript",
  "SnapToGrid",
  "GridWidth",
  "GridHeight"
].forEach((Property) => SNS_BoardPropertySet[Property] = true);
class SNS_Sticker extends SNS_Visual {
  /* protected */
  constructor(Project, Id) {
    super(Project, Id);
    /**** minWidth ****/
    __publicField(this, "_minWidth");
    /**** maxWidth ****/
    __publicField(this, "_maxWidth", defaultMaxWidth);
    /**** minHeight ****/
    __publicField(this, "_minHeight");
    /**** maxHeight ****/
    __publicField(this, "_maxHeight", defaultMaxHeight);
    /**** Geometry ****/
    __publicField(this, "_Geometry", { ...defaultStickerGeometry });
    /**** Lock ****/
    __publicField(this, "_Lock", false);
    /**** Visibility ****/
    __publicField(this, "_Visibility", true);
    /**** Enabling ****/
    __publicField(this, "_Enabling", true);
    registerSticker(Project, this);
    Project._reportChange("createSticker", this);
  }
  /**** Board ****/
  get Board() {
    return this._Folder;
  }
  set Board(_) {
    throwReadOnlyError("Board");
  }
  /**** BackgroundTexture ****/
  get BackgroundTexture() {
    return this._BackgroundTexture;
  }
  set BackgroundTexture(newTexture) {
    allowURL("visual background texture", newTexture);
    if (this._BackgroundTexture !== newTexture) {
      this._BackgroundTexture = newTexture;
      this._reportChange("configure", this, "BackgroundTexture", newTexture);
      this.rerender();
    }
  }
  /**** Index ****/
  get Index() {
    return this._Folder.IndexOfSticker(this);
  }
  set Index(_) {
    throwReadOnlyError("Index");
  }
  /**** mayBeShiftedUp ****/
  get mayBeShiftedUp() {
    return this._Folder.mayShiftStickerUp(this);
  }
  set mayBeShiftedUp(_) {
    throwReadOnlyError("mayBeShiftedUp");
  }
  /**** mayBeShiftedDown ****/
  get mayBeShiftedDown() {
    return this._Folder.mayShiftStickerDown(this);
  }
  set mayBeShiftedDown(_) {
    throwReadOnlyError("mayBeShiftedDown");
  }
  get minWidth() {
    return this._minWidth == null ? defaultMinWidth : this._minWidth;
  }
  set minWidth(newMinWidth) {
    allowDimension("minimal sticker width", newMinWidth);
    if (this._minWidth !== newMinWidth) {
      this._minWidth = newMinWidth;
      this._reportChange("configure", this, "minWidth", newMinWidth);
      if (this._minWidth != null && this._maxWidth != null && this._maxWidth < this._minWidth) {
        this._maxWidth = newMinWidth;
        this._reportChange("configure", this, "maxWidth", this._minWidth);
      }
      if (this._minWidth != null && this._Geometry.Width < this._minWidth) {
        this.Width = this._minWidth;
      }
      this.rerender();
    }
  }
  get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(newMaxWidth) {
    allowDimension("maximal sticker width", newMaxWidth);
    if (newMaxWidth != null && this._minWidth != null) {
      newMaxWidth = Math.max(this._minWidth, newMaxWidth);
    }
    if (this._maxWidth !== newMaxWidth) {
      this._maxWidth = newMaxWidth;
      this._reportChange("configure", this, "maxWidth", this._maxWidth);
      if (this._maxWidth != null && this._Geometry.Width > this._maxWidth) {
        this.Width = this._maxWidth;
      }
      this.rerender();
    }
  }
  get minHeight() {
    return this._minHeight == null ? defaultMinHeight : this._minHeight;
  }
  set minHeight(newMinHeight) {
    allowDimension("minimal sticker height", newMinHeight);
    if (this._minHeight !== newMinHeight) {
      this._minHeight = newMinHeight;
      this._reportChange("configure", this, "minHeight", newMinHeight);
      if (this._minHeight != null && this._maxHeight != null && this._maxHeight < this._minHeight) {
        this._maxHeight = newMinHeight;
        this._reportChange("configure", this, "maxHeight", this._minHeight);
      }
      if (this._minHeight != null && this._Geometry.Height < this._minHeight) {
        this.Height = this._minHeight;
      }
      this.rerender();
    }
  }
  get maxHeight() {
    return this._maxHeight;
  }
  set maxHeight(newMaxHeight) {
    allowDimension("maximal sticker height", newMaxHeight);
    if (newMaxHeight != null && this._minHeight != null) {
      newMaxHeight = Math.max(this._minHeight, newMaxHeight);
    }
    if (this._maxHeight !== newMaxHeight) {
      this._maxHeight = newMaxHeight;
      this._reportChange("configure", this, "maxHeight", this._maxHeight);
      if (this._maxHeight != null && this._Geometry.Height > this._maxHeight) {
        this.Height = this._maxHeight;
      }
      this.rerender();
    }
  }
  /**** x ****/
  get x() {
    return this._Geometry.x;
  }
  set x(newX) {
    expectLocation("sticker x coordinate", newX);
    this.Geometry = { ...this.Geometry, x: newX };
  }
  /**** y ****/
  get y() {
    return this._Geometry.y;
  }
  set y(newY) {
    expectLocation("sticker y coordinate", newY);
    this.Geometry = { ...this.Geometry, y: newY };
  }
  /**** Width ****/
  get Width() {
    return this._Geometry.Width;
  }
  set Width(newWidth) {
    expectDimension("sticker width", newWidth);
    this.Geometry = { ...this.Geometry, Width: newWidth };
  }
  /**** Height ****/
  get Height() {
    return this._Geometry.Height;
  }
  set Height(newHeight) {
    expectDimension("sticker height", newHeight);
    this.Geometry = { ...this.Geometry, Height: newHeight };
  }
  /**** Position ****/
  get Position() {
    return { x: this._Geometry.x, y: this._Geometry.y };
  }
  set Position(newPosition) {
    expectPosition("visual position", newPosition);
    this.Geometry = { ...this.Geometry, x: newPosition.x, y: newPosition.y };
  }
  /**** Size ****/
  get Size() {
    return { Width: this._Geometry.Width, Height: this._Geometry.Height };
  }
  set Size(newSize) {
    expectSize("visual size", newSize);
    this.Geometry = { ...this.Geometry, Width: newSize.Width, Height: newSize.Height };
  }
  get Geometry() {
    let { x, y, Width, Height } = this._Geometry;
    if (this._minWidth != null) {
      Width = Math.max(this._minWidth, Width);
    }
    if (this._maxWidth != null) {
      Width = Math.min(Width, this._maxWidth);
    }
    if (this._minHeight != null) {
      Height = Math.max(this._minHeight, Height);
    }
    if (this._maxHeight != null) {
      Height = Math.min(Height, this._maxHeight);
    }
    return { x, y, Width, Height };
  }
  set Geometry(newGeometry) {
    expectGeometry("visual geometry", newGeometry);
    let { x, y, Width, Height } = this._Geometry;
    if (x !== newGeometry.x || Width !== newGeometry.Width || y !== newGeometry.y || Height !== newGeometry.Height) {
      this._Geometry = { ...newGeometry };
      this._reportChange("configure", this, "Geometry", { ...newGeometry });
      this.rerender();
    }
  }
  get Lock() {
    return this._Lock;
  }
  set Lock(newLock) {
    expectBoolean("sticker lock", newLock);
    if (this._Lock !== newLock) {
      this._Lock = newLock;
      this._reportChange("configure", this, "Lock", newLock);
      this.rerender();
    }
  }
  /**** lock/unlock ****/
  lock() {
    this.Lock = true;
  }
  unlock() {
    this.Lock = false;
  }
  /**** isLocked ****/
  get isLocked() {
    return this._Lock;
  }
  set isLocked(newLock) {
    this.Lock = newLock;
  }
  get Visibility() {
    return this._Visibility;
  }
  set Visibility(newVisibility) {
    expectBoolean("sticker visibility", newVisibility);
    if (this._Visibility !== newVisibility) {
      this._Visibility = newVisibility;
      this._reportChange("configure", this, "Visibility", newVisibility);
      this.rerender();
    }
  }
  /**** show/hide ****/
  show() {
    this.Visibility = true;
  }
  hide() {
    this.Visibility = false;
  }
  /**** isVisible ****/
  get isVisible() {
    return this._Visibility;
  }
  set isVisible(newVisibility) {
    this.Visibility = newVisibility;
  }
  get Enabling() {
    return this._Enabling;
  }
  set Enabling(newEnabling) {
    expectBoolean("sticker enabling", newEnabling);
    if (this._Enabling !== newEnabling) {
      this._Enabling = newEnabling;
      this._reportChange("configure", this, "Enabling", newEnabling);
      this.rerender();
    }
  }
  /**** enable/disable ****/
  enable() {
    this.Enabling = true;
  }
  disable() {
    this.Enabling = false;
  }
  /**** isEnabled ****/
  get isEnabled() {
    return this._Enabling;
  }
  set isEnabled(newEnabling) {
    this.Enabling = newEnabling;
  }
  /**** Rendering ****/
  Rendering(PropSet) {
    if (this.hasError) {
      return ErrorRenderer.call(this);
    }
    let Renderer = this._Renderer || DefaultRenderer;
    try {
      return Renderer.call(this, PropSet);
    } catch (Signal) {
      this.Error = {
        Type: "Rendering Failure",
        Message: "" + Signal,
        Cause: Signal
      };
      return ErrorRenderer.call(this);
    }
  }
  /**** rerender ****/
  rerender() {
    this._Project.rerender(this._Folder, this);
  }
  /**** Serialization ****/
  get Serialization() {
    const Result = {};
    this._serializeConfigurationInto(Result);
    return Result;
  }
  set Serialization(_) {
    throwReadOnlyError("Serialization");
  }
  /**** _serializeConfigurationInto ****/
  _serializeConfigurationInto(Serialization) {
    super._serializeConfigurationInto(Serialization);
    Serialization.Geometry = { ...this._Geometry };
    if (this._minWidth != null) {
      Serialization.minWidth = this._minWidth;
    }
    if (this._maxWidth != null) {
      Serialization.maxWidth = this._maxWidth;
    }
    if (this._minHeight != null) {
      Serialization.minHeight = this._minHeight;
    }
    if (this._maxHeight != null) {
      Serialization.maxHeight = this._maxHeight;
    }
    if (this.isLocked) {
      Serialization.Lock = true;
    }
    if (!this.isVisible) {
      Serialization.Visibility = false;
    }
    if (!this.isEnabled) {
      Serialization.Enabling = false;
    }
  }
  /**** _deserializeConfigurationFrom ****/
  _deserializeConfigurationFrom(Serialization) {
    super._deserializeConfigurationFrom(Serialization);
    let { x, y, Width, Height } = Serialization.Geometry || defaultStickerGeometry;
    if (!ValueIsLocation(x)) {
      x = defaultStickerGeometry.x;
    }
    if (!ValueIsLocation(y)) {
      y = defaultStickerGeometry.y;
    }
    if (!ValueIsDimension(Width)) {
      Width = defaultStickerGeometry.Width;
    }
    if (!ValueIsDimension(Height)) {
      Height = defaultStickerGeometry.Height;
    }
    this.Geometry = { x, y, Width, Height };
    if (Serialization.Lock != null) {
      this.Lock = Serialization.Lock;
    }
    if (Serialization.Visibility != null) {
      this.Visibility = Serialization.Visibility;
    }
    if (Serialization.Enabling != null) {
      this.Enabling = Serialization.Enabling;
    }
  }
}
const SNS_ConnectionStates = ["not-ready", "disconnected", "connecting", "connected"];
class SNS_Adapter {
}
window.SNS = {
  throwError,
  throwReadOnlyError,
  SNS_Project
};
console.log("SNS is globally available now");
document.dispatchEvent(
  // @ts-ignore TS2339 allow global variable "SNS"
  new CustomEvent("SNS", { detail: window.SNS })
);
export {
  CSSStyleOfVisual,
  SNS_Adapter,
  SNS_Board,
  SNS_Changes,
  SNS_ConnectionStates,
  SNS_ErrorTypes,
  SNS_Folder,
  SNS_FontStyles,
  SNS_Project,
  SNS_Sticker,
  SNS_Visual,
  TemplateOfBehavior,
  ValueIsBoard,
  ValueIsDimension,
  ValueIsError,
  ValueIsFolder,
  ValueIsGeometry,
  ValueIsId,
  ValueIsIdentifier,
  ValueIsLocation,
  ValueIsName,
  ValueIsPosition,
  ValueIsProject,
  ValueIsSerializable,
  ValueIsSize,
  ValueIsSticker,
  ValueIsVisual,
  acceptableBoolean,
  acceptableColor,
  acceptableEMailAddress,
  acceptableFunction,
  acceptableInteger,
  acceptableIntegerInRange,
  acceptableList,
  acceptableListSatisfying,
  acceptableNonEmptyString,
  acceptableNumber,
  acceptableNumberInRange,
  acceptableOptionalBoolean,
  acceptableOptionalColor,
  acceptableOptionalFunction,
  acceptableOptionalInteger,
  acceptableOptionalIntegerInRange,
  acceptableOptionalList,
  acceptableOptionalListSatisfying,
  acceptableOptionalNonEmptyString,
  acceptableOptionalNumber,
  acceptableOptionalNumberInRange,
  acceptableOptionalOrdinal,
  acceptableOptionalString,
  acceptableOptionalStringMatching,
  acceptableOptionalText,
  acceptableOptionalTextline,
  acceptableOrdinal,
  acceptablePhoneNumber,
  acceptableString,
  acceptableStringMatching,
  acceptableText,
  acceptableTextline,
  acceptableURL,
  allowBoard,
  allowDimension,
  allowError,
  allowFolder,
  allowGeometry,
  allowId,
  allowIdentifier,
  allowLocation,
  allowName,
  allowPosition,
  allowProject,
  allowSerializable,
  allowSize,
  allowSticker,
  allowVisual,
  allowedBoard,
  allowedDimension,
  allowedError,
  allowedFolder,
  allowedGeometry,
  allowedId,
  allowedIdentifier,
  allowedLocation,
  allowedName,
  allowedPosition,
  allowedProject,
  allowedSerializable,
  allowedSize,
  allowedSticker,
  allowedVisual,
  attachBoard,
  attachSticker,
  configureFolder,
  configureSticker,
  createBoard,
  createSticker,
  destroyBoard,
  destroySticker,
  detachBoard,
  detachSticker,
  expectBoard,
  expectDimension,
  expectError,
  expectFolder,
  expectGeometry,
  expectId,
  expectIdentifier,
  expectLocation,
  expectName,
  expectPosition,
  expectProject,
  expectSerializable,
  expectSize,
  expectSticker,
  expectVisual,
  expectedBoard,
  expectedDimension,
  expectedError,
  expectedFolder,
  expectedGeometry,
  expectedId,
  expectedIdentifier,
  expectedLocation,
  expectedName,
  expectedPosition,
  expectedProject,
  expectedSerializable,
  expectedSize,
  expectedSticker,
  expectedVisual,
  groupedBehaviorEntryList,
  newId,
  removeIdsFrom,
  sanitizeBoardList,
  sanitizeStickerList,
  throwError,
  throwReadOnlyError
};
//# sourceMappingURL=shareable-note-stickers.js.map
