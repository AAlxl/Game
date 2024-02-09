document.addEventListener('DOMContentLoaded', function(){
    const canvas = document.getElementById('game2');
    const ctx = canvas.getContext('2d');
    var size_block = 30;
    var count_block = 20;
    var varna = 0;
    const snake = {//обьект змейки
        x: Math.floor(count_block / 2),
        y: Math.floor(count_block / 2),
        dx: 1,
        dy: 0,
        snake_blocks: [],
        length: 3
    };


    const apple = {
        x: Math.floor(Math.random() * count_block),
        y: Math.floor(Math.random() * count_block),
        spple_blocks: []
    }
    for(let i=0;i<10; i++){
        const newApple = {
            x: Math.floor(Math.random() * count_block),
            y: Math.floor(Math.random() * count_block)
        }
        apple.spple_blocks.push(newApple);
    }

    function drawBlock(x,y, color){
        ctx.fillStyle = color;
        ctx.fillRect(x * size_block, y * size_block, size_block, size_block);
        ctx.Stroke = '#000';
        ctx.strokeRect(x * size_block, y * size_block, size_block, size_block);
    }

    function drawSnake(){
        for(let i=0;i<snake.snake_blocks.length; i++){
            const block = snake.snake_blocks[i];
            drawBlock(block.x, block.y, '#0f0');

        }
    }

    function drawApple(){
        
        for(let i=0;i<apple.spple_blocks.length; i++){
            const block = apple.spple_blocks[i];
            drawBlock(block.x, block.y, '#f00');

        }
        //drawBlock(apple.x, apple.y, '#f00');
    }

    function draw(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        drawSnake();
        drawApple()
    }

    function update(){
        const newHead = {
            x: snake.x + snake.dx,
            y: snake.y + snake.dy
        }
        if(newHead.x < 0 || newHead.y < 0 || newHead.x >= count_block || newHead.y >= count_block){
            gameOver();
            return;
        }
        for(let i=0;i<snake.snake_blocks.length; i++){
            const block = snake.snake_blocks[i];
            if(newHead.x === block.x && newHead.y === block.y){
                gameOver();

                return;
            }
        }
        for(let i=0;i<apple.spple_blocks.length; i++){
            const block = apple.spple_blocks[i];
            if(newHead.x === block.x && newHead.y === block.y){
                snake.length+=1;
                varna+=1;
                apple.spple_blocks = [];
                for(let i=0;i<10; i++){
                    const newApple = {
                        x: Math.floor(Math.random() * count_block),
                        y: Math.floor(Math.random() * count_block)
                    }
                    apple.spple_blocks.push(newApple);
                }
            }else{
                snake.snake_blocks.shift();
            }

        }
        /*if(newHead.x === apple.x && newHead.y === apple.y){
           




        }else{
            
        }*/
        snake.snake_blocks.push(newHead);
        snake.x = newHead.x;
        snake.y = newHead.y;
    }

    function gameOver(){
        alert('Game Over');
        alert(varna);
        varna=0;
        resetGame();
    }

    function resetGame(){
        snake.x = Math.floor(count_block / 2);
        snake.y = Math.floor(count_block / 2);
        snake.dx = 1;
        snake.dy = 0;
        snake.snake_blocks = [];
        snake.length = 3;

        snake.x = Math.floor(Math.random() * count_block);
        snake.y = Math.floor(Math.random() * count_block);
    }

    function handleKeyPres(event){
        switch(event.key){
            case 'ArrowUp':
                snake.dx = 0;
                snake.dy = -1;
            break;
            case 'ArrowDown':
                snake.dx = 0;
                snake.dy = 1;
            break;
            case 'ArrowLeft':
                snake.dx = -1;
                snake.dy = 0;
            break;
            case 'ArrowRight':
                snake.dx = 1;
                snake.dy = 0;
            break;
        }
    }


    document.addEventListener("keydown", handleKeyPres);

    function gameLoop(){
        update();
        draw();
    }
    gameLoop();
    //$('#start').on('click', function(){
      //  setInterval(gameLoop, 150);
    //});
        

   

});

//FLASK