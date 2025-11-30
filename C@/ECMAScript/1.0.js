// C@ code
// Created by SHAMAN2016
// License: MIT
Commands = []; UserCommands = {};
Cdog = {}
Cdog_config = {
  "user": {},
  "program": {}
}
Cdog_data = {
  "libs": {},
  "src": {}
}
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
      Cdog.i++; Cdog.main.code = Cdog.i2.split(";")
    } else if (Cdog.i2.split(" ")[0] === '#include' || Cdog.i2.split(" ")[0] === '#import' || Cdog.i2.split(" ")[0] === 'import') {
      Cdog.import.code = Cdog.i2.split(" ")
      if (Cdog_data.src[Cdog.import.code[1]]) {
        lib_Cdog = Cdog_data.src[Cdog.import.code[1]]
        Cdog_data.libs[lib_Cdog['data.json'].sod.name] = {
          "file": Cdog.import.code[1],
          "from": "main",
        }
      } else {
        console.error('File not found')
      }
    }
  }
}
