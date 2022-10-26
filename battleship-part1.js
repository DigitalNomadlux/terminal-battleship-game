const readlineSync = require(`readline-sync`);

const gameLayout = () => {

  //Variables
  const alphabet = ["A", "B", "C"];
  let grid = [];
  let ships = [];
  let shotsTaken = [];
  let hit = `Hit! You have sunk a battleship! There is 1 ship(s) remaining! `;
  let miss = `You have missed!`;
  let retry = `You have already fired at this location! Miss!!`;

  let tryAgain;

  //func to build grid
  const createGrid = (letters) => {
    letters.map((cord) => {
      for (let i = 0; i < letters.length; i += 1) {
        grid.push(cord + (i + 1));
      }
    });
  };
  createGrid(alphabet);

  //generate ships
  const genShips = () => {
    const vert = Math.floor(Math.random() * alphabet.length + 1);
    const hor = alphabet[Math.floor(Math.random() * alphabet.length)];
    const shipLocation = hor + vert;

    if (shipLocation == ships) {
      genShips();
    } else {
      ships.push(shipLocation);
    }
  };
  genShips();
  genShips();

  //User Shot
  const playerStrike = (canon) => {
    let intake = canon.toString();
    let shootAction = intake.toUpperCase();
    shotsTaken.push(shootAction);
    return shootAction;
  };

  //check for hit.
  const checkForHit = (shot) => {
    let destroyed = ships.includes(shot);

    if (destroyed === true) {
      return hit;
    } else {
      return miss;
    }
  };

  //existing stikes
  const isExistingStrike = (input) => {
    let guessedShot = shotsTaken.includes(input);
    if (guessedShot === true) {
      console.log(retry);
      return true;
    } else {
      return false;
    }
  };

  //Beginning of game
  const enterGame = readlineSync.keyInYN("Would you like to play battleship? ");

  if (enterGame) {
    while (ships.length > 0) {
      console.log('line 77', { ships });
      if (enterGame) {
        const playerGuess = readlineSync.question(
          `Enter a location to strike! For example "A2": `
        );
        if (!isExistingStrike(playerGuess.toUpperCase())) {
          if (checkForHit(playerStrike(playerGuess)) === hit) {
            let index = ships.indexOf(playerGuess.toUpperCase());
            ships.splice(index, 1);
            if (hit) {
              if (ships.length > 0) {
                console.log(hit);
                console.log(`Let's see if you can get the next one! `);
              }
              console.log({ shotsTaken });
            } else {
              console.log(miss);
              tryAgain = readlineSync.question(`Try again! `);
              checkForHit(playerStrike(tryAgain));
            }
          } else {
            console.log(miss);
            console.log(`Try again! `);
          }
        }
      } else {
        console.log(`We will be here whenever you're ready! `);
      }
    }
  }
  if (ships.length === 0) {
    console.log(`Hit!! You have sunk a battleship!`);
    const replayGame = readlineSync.keyInYN(
      `Victory!
      You have sunk all battleships. Would you like to play again?`
    );
    if (replayGame) {
      gameLayout();
    }
  }
};
gameLayout();