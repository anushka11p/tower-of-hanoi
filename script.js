let pegs = [[], [], []];
let nDisks = 3;

function resetGame() {
  pegs = [[], [], []];
  for (let d = nDisks; d >= 1; d--) {
    pegs[0].push(d);
  }
  render();
}

//RECURSION SECTION
function hanoi(n, from, to, aux, moves) {
  if (n === 0) return;              // base case- stops recursion
  hanoi(n - 1, from, aux, to, moves); // recursive call 1
  moves.push({ disk: n, from, to });  // record the move
  hanoi(n - 1, aux, to, from, moves); // recursive call 2
}
//END RECURSION

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function startSolve() {
  resetGame();
  const moves = [];
  hanoi(nDisks, 0, 2, 1, moves);

  //ITERATION SECTION
  for (let i = 0; i < moves.length; i++) {
    const { from, to } = moves[i];
    pegs[to].push(pegs[from].pop());
    render();
    await sleep(500);
  }
  //END ITERATION
}

function render() {
  const canvas = document.getElementById('cv');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, W, H);

  const pegXs = [W * 0.2, W * 0.5, W * 0.8];
  const baseY = H - 30;
  const diskH = 24;

  ctx.fillStyle = '#444';
  ctx.fillRect(20, baseY + 2, W - 40, 8);

  pegXs.forEach((px, pi) => {
    ctx.fillStyle = '#aaa';
    ctx.fillRect(px - 5, baseY - (nDisks + 1) * diskH, 10, (nDisks + 1) * diskH);

    pegs[pi].forEach((d, idx) => {
      const dw  = 24 + d * 26;
      const dy  = baseY - (idx + 1) * diskH;
      const col = `hsl(${d * 50}, 80%, 55%)`;

      ctx.shadowColor = col;
      ctx.shadowBlur  = 14;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.roundRect(px - dw / 2, dy, dw, diskH - 4, 6);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#000';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(d, px, dy + diskH - 8);
      
    });
    ctx.fillStyle = '#aaa';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(['A', 'B', 'C'][pi], px, H - 8);
  });
}

resetGame();