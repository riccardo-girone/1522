<script>
	import { onMount } from "svelte";

	let email;
	let password;
	let error = "";

	function handleSubmit() {
		if (!email || !password) {
			error = "Per favore, inserisci sia l'email che la password";
			return;
		}

		if (!email.includes("@")) {
			error = "Email non valida";
			return;
		}

		error = "";
		console.log("Login dati:", { email, password });
	}
</script>

<div class="content">
	<h1>Accedi</h1>
	<form class="form" on:submit|preventDefault={handleSubmit}>
		<div class="formWrapper">
			<div class="formComponent">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="esempio@email.it"
					aria-required="true"
				/>
			</div>

			<div class="formComponent">
				<label for="password">Password</label>
				<input
					type="text"
					id="password"
					bind:value={password}
					placeholder="Password"
					aria-required="true"
				/>
			</div>

			{#if error}
				<div class="error-message" role="alert">
					{error}
				</div>
			{/if}

			<button type="submit" class="submitButton"> Accedi </button>
		</div>
	</form>
</div>

<style>
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 5vw;
		margin-bottom: 5vw;
	}

	.form {
		width: 20vw;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
		background: #ffffff;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.formWrapper {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
	}

	.formComponent {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	label {
		font-weight: 500;
		color: #333;
		cursor: pointer;
	}

	input[type="email"],
	input[type="text"] {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 6px;
		transition: border-color 0.2s ease;
		font-size: 1rem;
	}

	.error-message {
		color: #dc3545;
		font-size: 0.875rem;
		margin-top: 0.5rem;
	}

	input:focus {
		outline: none;
		border-color: #fe7d97;
		box-shadow: 0 0 0 2px #df627b;
	}

	.submitButton {
		padding: 0.75rem 1.5rem;
		background: #fe7d97;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.2s ease;
		width: 100%;
	}

	.submitButton:hover {
		background: #df627b;
	}

	@media (max-width: 768px) {
		.form {
			width: 90vw;
			padding: 1.5rem;
		}

		input[type="email"],
		input[type="text"] {
			padding: 0.625rem;
		}

		h1 {
			margin: 0;
			margin-bottom: 2vw;
		}
	}
</style>
