// C@ code
// Created by SHAMAN2016
// License: MIT
Commands = []; UserCommands = {};
Cdog = {}
Cdog_config = {}
function Run_Cdog(c) {
  Cdog.code = c.split("^;")
  for(Cdog.i = 0; Cdog.i < Cdog.code.length; Cdog.i++) {
    Cdog.i2 = Cdog.code[Cdog.code[Cdog.i]]
    if (Cdog.i2 === 'let system()') {
      Cdog.i++; Cdog.system.code = Cdog.i2.split("&^")
    } else if (Cdog.i2 === 'let main()') {
      Cdog.i++; Cdog.main.code = Cdog.i2.split(";")
    } else if (Cdog.i2.split[" "][0] === '#include' || Cdog.i2.split[" "][0] === '#import' || Cdog.i2.split[" "][0] === 'import') {
      Cdog.import.code = Cdog.i2.split(" ")
    }
  }
}
