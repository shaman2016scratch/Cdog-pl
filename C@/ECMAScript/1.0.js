// C@ code
// Created by SHAMAN2016
// License: MIT
UserCommands = {}; UserReporters = {};
Cdog = {}
Cdog_config = {
  "user": {},
  "program": {}
}
Cdog_data = {
  "libs": {},
  "src": {}
}
Cdog_peremens = {}
function Run_Cdog(c) {
  Cdog.code = c.split("^;")
  for(Cdog.i = 0; Cdog.i < Cdog.code.length; Cdog.i++) {
    Cdog.i2 = Cdog.code[Cdog.i]
    if (Cdog.i2 === 'let system()') {
      Cdog.i++; Cdog.system.code = Cdog.i2.split("&^")
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
      libraries = Object.keys(Cdog_data.libs)
      Cdog.i++; Cdog.i2 = Cdog.code[Cdog.i]; Cdog.main.code = Cdog.i2.split(";")
      for(Cdog.main.i = 0; Cdog.main.i < Cdog.main.code.length; Cdog.main.i++) {
        Cdog.main.i2 = Cdog.main.code[Cdog.main.i]
        if (Cdog.main.i2.split(" ")[0] === 'var') {
          if (Cdog.main.i2.split(" ")[1].split(".").length > 1) {
            i2 = Cdog.main.i2.split(" ")[1].split(".")
            i3 = "Cdog_peremens"
            for(i = 0; i < i2.length; i++) {
              i3 = `${i3}[Cdog_value(${i2[i]})]`
            }
            eval(`${i3} = Cdog_value(${i2[i]})`)
          } else {
            Cdog_peremens[Cdog.main.i2.split(" ")[1]] = Cdog.main.i2.split(" ")[3]
          }
        }
      }
    } else if (Cdog.i2.split(" ")[0] === '#include' || Cdog.i2.split(" ")[0] === '#import' || Cdog.i2.split(" ")[0] === 'import') {
      Cdog.import.code = Cdog.i2.split(" ")
      if (Cdog_data.src[Cdog.import.code[1]]) {
        lib_Cdog = Cdog_data.src[Cdog.import.code[1]]
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
    return v.value
  } else if (typeof v === 'object' && UserReporters[v.type]) {
    return UserReporters[v.type](v.value)
  } else if (typeof v === 'object' || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
    return v
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
