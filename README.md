# Tower of Hanoi — RISC-V Demo

An interactive **Tower of Hanoi** visualization built with vanilla JavaScript and HTML5 Canvas.  
Demonstrates both **recursion** and **iteration** as core algorithmic concepts, with colorful animated graphics.

---

## Demo

Open `index.html` in any browser- no installation or dependencies needed.

---


Project Structure

<img width="314" height="114" alt="Screenshot 2026-05-04 at 12 13 33 AM" src="https://github.com/user-attachments/assets/97f44711-6cb8-4b75-aa8c-cb26c1ddc9c8" />

---

## How It Works

### Recursion — Move Generation
The `hanoi()` function uses **recursion** to generate all required moves.  
It calls itself twice per level, shrinking the problem by one disk each time.

```javascript
function hanoi(n, from, to, aux, moves) {
  if (n === 0) return;                      // base case— stop recursion
  hanoi(n - 1, from, aux, to, moves);       // recursive call 1
  moves.push({ disk: n, from, to });        // record the move
  hanoi(n - 1, aux, to, from, moves);       // recursive call 2
}
```

### Iteration — Move Playback
The `startSolve()` function uses a **for loop** to replay each move one by one with an animated delay.

```javascript
for (let i = 0; i < moves.length; i++) {
  pegs[to].push(pegs[from].pop());   // move disk
  render();                           // redraw canvas
  await sleep(500);                   // wait between frames
}
```

---

## Algorithm

| Property | Value |
|---|---|
| Total moves | 2ⁿ − 1 |
| Time complexity | O(2ⁿ) |
| Space complexity | O(n) call stack |
| Default disks | 3 → 7 moves |

---

## Running Locally

1. Clone the repo:
```bash
git clone https://github.com/anushka11p/tower-of-hanoi.git
```

2. Open the folder:
```bash
cd tower-of-hanoi
```

3. Double-click `index.html` or open it in your browser.

---

## RISC-V Context

This project was created as part of the **RISC-V High Precision Code Base** challenge.  
The recursive calls map directly to `JAL`/`RET` instructions on RISC-V hardware,  
while the iterative playback loop maps to a `BNE` branch — demonstrating both  
core control-flow primitives of the RISC-V ISA.

---

## Built With

- HTML5 Canvas
- Vanilla JavaScript (no frameworks)
- CSS3

---

## License

MIT — free to use and modify.
