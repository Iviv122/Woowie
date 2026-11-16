

https://github.com/user-attachments/assets/2680a216-5881-40ba-9fdd-06f19ccd3f59

pain
<img width="2418" height="792" alt="Screenshot 2026-11-08 at 14-49-53 Woowie" src="https://github.com/user-attachments/assets/7c5ac1d5-1ccd-47d9-a9b4-6aa6954c185e" />

WOowie - simple fun app where you draw with simetrical dotes made in pure* JS

Demo: https://iviv122.github.io/Woowie/

- contains html to load js

Controls:

- Change pattern - Left mouse button
- Change background - Right mouse button
- Change Color - Mouse wheel

Main technique used for this is modulo math. Since i can't use if statement, and i need to switch states, we can put functions into array and put them into correct order. After that we will increment function index and loop it with modulo.

Also, i don't trust webpack or vite, since i don't know how they utilize if conditions, therefore i need to make everything by myself, and i don't want to load js from js.

Because of that, in order to separate code i use classes and static methods. I can use IDE's code collapse and make it more readable
