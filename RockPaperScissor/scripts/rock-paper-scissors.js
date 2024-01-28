// Recupera la puntuación del almacenamiento local o establece valores predeterminados
let score = JSON.parse(localStorage.getItem('score'))
      ||{
          wins:0,
          losses:0,
          ties:0
        }
        // Inicializa y actualiza la puntuación en la interfaz de usuario
        updateScoreElement();



        /* Esto solo es un comentario
      if (!score){
        score={
          wins:0,
          losses:0,
          ties:0
        };
      }
      */

      let isAutoPlaying = false;
      let intervalId;

      //const autoPlay = () =>{

      //};

      // Función para activar/desactivar el modo de juego automático
      function autoPlay(){
        if (!isAutoPlaying) {
            intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
          }, 1000);
          isAutoPlaying = true;
        } else {
          clearInterval(intervalId);
          isAutoPlaying = false;
        }
      }
      // Event listeners para los botones de las opciones de juego
      document.querySelector('.js-rock-button')
        .addEventListener('click', () => {
          playGame('rock');
        });

      document.querySelector('.js-paper-button')
        .addEventListener('click', () => {
          playGame('paper');
        });

      document.querySelector('.js-scissors-button')
        .addEventListener('click', () => {
          playGame('scissors');
        });
      // Event listener para las teclas de atajo ('r', 'p', 's')
      document.body.addEventListener('keydown', (event) =>{
        if (event.key === 'r'){
          playGame('rock');
        } else if (event.key === 'p'){
          playGame('paper');
        } else if (event.key === 's'){
          playGame('scissors');
        }
      })
      // Función principal del juego
      function playGame(playerMove){
        const computerMove = pickComputerMove();

        let result='';
        // If para determinar el resultado del juego
        if(playerMove === 'scissors'){
          if (computerMove==='rock'){
            result='You lose.';
          } else if (computerMove==='paper'){
            result='You win.';
          } else if (computerMove==='scissors'){
            result='Tie.';
          }
          
        } else if (playerMove==='paper'){
          if (computerMove==='rock'){
            result='You win.';
          }else if (computerMove==='paper'){
            result='Tie.';
          }else if (computerMove==='scissors'){
            result='You lose.';
          }

        } else if (playerMove==='rock'){
          if (computerMove === 'rock'){
            result='Tie.';
          } else if (computerMove === 'paper'){
            result = 'You lose.';
          } else if (computerMove === 'scissors'){
            result = 'You win.'
          }
        }

        // Actualiza la puntuación
        if (result=== 'You win.'){
          score.wins += 1;
        } else if (result === 'You lose.'){
          score.losses +=1;
        } else if (result === 'Tie.'){
          score.ties +=1;
        }
        // Guarda la puntuación en el almacenamiento local
        localStorage.setItem('score', JSON.stringify(score));

        // Muestra el resultado en la interfaz de usuario
        document.querySelector('.js-result')
          .innerHTML = `${result}`;

        document.querySelector('.js-moves')
          .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon">
          <img src="images/${computerMove}-emoji.png" class="move-icon">
      Computer`;

        
      // Actualiza la puntuación en la interfaz de usuario
        updateScoreElement();
        }

        function updateScoreElement(){
          document.querySelector('.js-score')
          .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
        }


      // Funcion para saber el movimiento de la computadora
      function pickComputerMove(){
          const randomNumber=Math.random();

          let computerMove='';

          if (randomNumber>=0&&randomNumber<1/3){
            computerMove='rock';
          } else if (randomNumber>=1/3&&randomNumber<2/3){
            computerMove='paper';
          } else if (randomNumber>=2/3&&randomNumber<1){
            computerMove='scissors';
          }

          return computerMove;
      }