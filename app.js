require("colors");

const {
  inquirerMenu,
  pausa,
  nouAlumne,
  alumneSelect,
  novesHores,
  confirmar,
} = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");

const AlumnesHores = require("./models/alumneshores");

const main = async () => {
  let opt = "";
  const alumnes = new AlumnesHores();

  const alumnesDB = readDB();

  if (alumnesDB) {
    alumnes.carregarAlumnesFromArray(alumnesDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const nomAlumne = await nouAlumne("Nom alumne:");
        alumnes.crearAlumne(nomAlumne, 0);
        // const alumne = new Alumne("Ricard", 10);
        // console.log(alumne);
        break;

      case "2":
        alumnes.llistarAlumnes();
        break;

      case "3":
        alumnes.llistarAlumnesHores();

        break;

      case "4":
        const id1 = await alumneSelect(alumnes.llistatArr);
        const numHores = await novesHores("Introdueix hores:");

        alumnes.guardarHores(id1, numHores);
        break;

      case "5":
        const id2 = await alumneSelect(alumnes.llistatArr);
        if (id2 !== "0") {
          const ok = await confirmar("Estas segur que vols eliminar l'alumne?");
          if (ok) {
            alumnes.eliminarAlumne(id2);
            console.log("Alumne eliminat!");
          }
        }
        break;

      default:
        break;
    }

    guardarDB(alumnes.llistatArr);

    await pausa();
  } while (opt !== "0");
};

main();
