<script lang="ts">
	import Nested from './Nested.svelte';

	// variables
	let name = 'world';
	let src = 'https://media1.tenor.com/images/4324d537dbc06f422b34ae131c7b3e14/tenor.gif';
	let string = `this string contains some <strong>HTML!!!</strong>`;

	let count = 0;
	$: doubled = count * 2; // update 'doubled' when 'count' gets reassigned
	$: console.log(`the count is ${count}`);

	$: if (count >= 10) {
		console.log(`count is dangerously high!`);
	}

	function handleClick() {
		// triggers update from reassignment
		count += 1;
		// count = count + 1;
	}

	let numbers = [1, 2, 3, 4];

	function addNumber() {
		// triggers update from reassignment
		numbers[numbers.length] = numbers.length + 1;
		// numbers = [...numbers, numbers.length + 1];

		// doesn't trigger an update
		// numbers.push(numbers.length + 1);
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);

	const things = {
		thing1: 'heya',
		thing2: 'heya2',
	};

	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}

	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];

	let idThings = [
		{ id: 1, color: 'darkblue' },
		{ id: 2, color: 'indigo' },
	];

	async function sleep (ms: number) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, ms);
		});
	}

	async function getNumber() {
		await sleep(3000);
		throw new Error('woops');
		return 42;
	}

	const promise = getNumber();

	let m = { x: 0, y: 0 };

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	function singleClick() {
		alert('no more alerts')
	}
</script>

<style>
	.styled {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}

	.mouse-block {
		width: 800px;
		height: 200px;
		background-color: lightgreen;
	}
</style>


<h1>Hello {name}!</h1>
<img {src} alt='Rick Roll Gif'>
<p class="styled">This is a styled paragraph.</p>

<!-- Using unsanitized html -->
<p>{@html string}</p>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>
<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>
	Add a number
</button>

<!-- Sending props to nested components -->
<Nested answer={42}/>
<Nested {...things}/>

{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}

<h1>The Famous Cats of YouTube</h1>

<!-- Looping over an array -->
<ul>
	{#each cats as { id, name }, i}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={id}">
			{i + 1}: {name}
		</a></li>
	{/each}
</ul>

<!-- Using keys for items in an array to track what changed -->
{#each idThings as thing (thing.id)}
	<p>{thing.color}</p>
{/each}

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<div class="mouse-block" on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>

<!-- modifiers:
preventDefault — calls event.preventDefault() before running the handler. Useful for client-side form handling, for example.
stopPropagation — calls event.stopPropagation(), preventing the event reaching the next element
passive — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it's safe to do so)
nonpassive — explicitly set passive: false
capture — fires the handler during the capture phase instead of the bubbling phase ()
once — remove the handler after the first time it runs
self — only trigger handler if event.target is the element itself
-->
<button on:click|once={singleClick}>
	Click me
</button>