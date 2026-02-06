// C@ code
// Created by SHAMAN2016
// License: MIT
let UserCommands = {}; let UserReporters = {};
let Cdog = {}
let Cdog_config = {
  "user": {},
  "program": {}
}
let Cdog_data = {
  "libs": {},
  "src": {}
}
Cdog_peremens = {}
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
  }
}
function getNestedValue(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return undefined;
    }
    current = current[key];
  }
  return current;
}
function Run_Cdog(c) {
  Cdog.code = c.split('^;\n  ')
  for(Cdog.i = 0; Cdog.i < Cdog.code.length; Cdog.i++) {
    Cdog.i2 = Cdog.code[Cdog.i]
    if (Cdog.i2 === 'let system()') {
      Cdog.i++; Cdog.system.code = Cdog.i2.split("&^\n  ")
      for(Cdog.system.i = 0; Cdog.system.i < Cdog.system.code; Cdog.system.i++) {
        Cdog.system.i2 = Cdog.system.code[Cdog.i]
        if (Cdog.system.i2 === '#user') {
          Cdog_config.user.name = Cdog.system.code[Cdog.i+1]
          Cdog_config.user.agent = Cdog.system.code[Cdog.i+2]
          Cdog_config.user.pass = Cdog.system.code[Cdog.i+3]
          Cdog.system.i = Cdog.system.i+3
        } else if (Cdog.system.i2 === '#program') {
          Cdog_config.program.name = Cdog.system.code[Cdog.i+1]
          Cdog_config.program.agent = Cdog.system.code[Cdog.i+2]
          Cdog_config.program.description = Cdog.system.code[Cdog.i+3]
          Cdog_config.program.creators = Cdog.system.code[Cdog.i+4]
          Cdog_config.program.version = Cdog.system.code[Cdog.i+5]
          Cdog.system.i = Cdog.system.i+5
        }
      }
    } else if (Cdog.i2 === 'let main()' || Cdog.i2 === 'public static void main()' || Cdog.i2 === 'int main()') {
      let libraries = Object.keys(Cdog_data.libs); let lib = ""; let lib_Cdog = "";
      for(i = 0; i < libraries.length; i++) {
        lib = Cdog_data.libs[libraries[i]]
        lib_Cdog = Cdog_data.src[lib]
        for(i2 = 0; i2 < lib.froms.length; i2++) {
          if (lib_Cdog['data.json'].sod.pl === 'Cdog') {
            Run_Cdog(lib_Cdog[lib_Cdog['data.json'].sod.from[lib.froms[i]]].code)
          } else if (lib_Cdog['data.json'].sod.pl === "ECMAScript") {
            let code = lib_Cdog[lib_Cdog['data.json'].sod.from[lib.froms[i]]].code
            code()
          }
        }
      }
      Cdog.i++; Cdog.i2 = Cdog.code[Cdog.i]; Cdog.main.code = Cdog.i2.split(";\n  ")
      for(Cdog.main.i = 0; Cdog.main.i < Cdog.main.code.length; Cdog.main.i++) {
        Cdog.main.i2 = Cdog.main.code[Cdog.main.i]
        if (Cdog.main.i2.split(" ")[0] === 'var') {
          const parts = Cdog.main.i2.trim().split(/\s+/);
          if (parts.length >= 4 && parts[2] === '=') {
            const varPath = parts[1];
            const rawValue = parts[3];
            if (rawValue.includes('.')) {
              const value = getNestedValue(Cdog_peremens, rawValue);
              setNestedValue(Cdog_peremens, varPath, Cdog_value(value));
            } else {
              setNestedValue(Cdog_peremens, varPath, Cdog_value(rawValue));
            }
          }
        } else if (Cdog.main.i2.split(" ")[0] === 'function') {
          let i = Cdog.main.i2.split(" ")
          if (i[1] === 'command') {
            UserCommands[i[2]] = [["args"], "Run_Cdog('"]
            Cdog.main.i++; Cdog.main.i2 = Cdog.main.code[Cdog.main.i]; let i3 = Cdog.main.i2.split('*^\n  ')
            for(let i2 = 0; i2 < i3.length; i2++) {
              UserCommands[i[2]] = `${UserCommands[i[2]]}${i3[i2]}`
            }
            UserCommands[i[2]] = `${UserCommands[i[2]]}')`
          } else if (i[1] === 'reporter') {
            UserReporters[i[2]] = [["args"], "Run_Cdog('"]
            Cdog.main.i++; Cdog.main.i2 = Cdog.main.code[Cdog.main.i]; let i3 = Cdog.main.i2.split('*^')
            for(let i2 = 0; i2 < i3.length; i2++) {
              UserReporters[i[2]] = `${UserReporters[i[2]]}${i3[i2]}`
            }
            UserReporters[i[2]] = `${UserReporters[i[2]]}')`
          }
        } else if (UserCommands[Cdog.main.i2.split(" ")[0]]) {
          func = UserCommands[Cdog.main.i2.split(" ")[0]]; code = new Function(func[0], func[1]); code(Cdog.main.i2.split(" ")[1])
        }
      }
    } else if (Cdog.i2.split(" ")[0] === '#include' || Cdog.i2.split(" ")[0] === '#import' || Cdog.i2.split(" ")[0] === 'import') {
      Cdog.import.code = Cdog.i2.split(" ")
      if (Cdog_data.src[Cdog.import.code[1]]) {
        let lib_Cdog = Cdog_data.src[Cdog.import.code[1]]
        if (Cdog.import.code[2]) {
          if (Cdog.import.code[2] === 'from') {
            if (Cdog_data.libs[lib_Cdog['data.json'].sod.name]) {
              Cdog_data.libs[lib_Cdog['data.json'].sod.name].froms.push(Cdog.import.code[3])
            } else {
              Cdog_data.libs[lib_Cdog['data.json'].sod.name] = {
                "file": Cdog.import.code[1],
                "froms": [
                  Cdog.import.code[3]
                ],
                "lang": lib_Cdog['data.json'].sod.pl,
              }
            }
          } else {
            Cdog_data.libs[lib_Cdog['data.json'].sod.name] = {
              "file": Cdog.import.code[1],
              "froms": [
                "main"
              ],
              "lang": lib_Cdog['data.json'].sod.pl,
            }
          }
        }
      } else {
        MakeError('file not found', Cdog.import.code[1])
      }
    }
  }
}
function Cdog_value(v) {
  if (typeof v === 'object' && v.type === "value") {
    return v.value;
  } else if (typeof v === 'object' && UserReporters[v.type]) {
    func = UserReporters[v.type]; code = new Function(func[0], func[1]); return code(v.value)
  } else if (typeof v === 'string' && v.includes('.')) {
    const value = getNestedValue(Cdog_peremens, v);
    return value !== undefined ? value : v;
  } else if (['object', 'string', 'number', 'boolean'].includes(typeof v)) {
    return v;
  } else {
    return String(v);
  }
}
function MakeError(e, p) {
  if (e === 'file not found') {
    console.error(`[C@] File "${p}" not found`)
  } else if (e === 'command not found') {
    console.error(`[C@] Command "${p.c}" not found. (${p.s})`)
  } else if (e === 'syntax error') {
    console.error(`[C@] Syntax error: ${p}`)
  }
}
