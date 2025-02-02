<script>
	import { onMount } from "svelte";

	let nome;
	let cognome;
	let telefono;
	let email;
	let tipoProblema;
	let richiesta;

	const tipiProblema = [
		{ value: "violenzaDomestica", label: "violenza domestica" },
		{ value: "violenzaVerbale", label: "violenza verbale" },
		{ value: "stolking", label: "stolking" },
		{ value: "altro", label: "altro" },
	];

	function handleSubmit() {
		const formData = {
			nome,
			cognome,
			telefono,
			email,
			tipoProblema,
			richiesta,
		};

		console.log("Form dati:", formData);
	}
</script>

<div class="content">
	<h1>Compila il ticket</h1>
	<p>
		Ti contteremo tramite i contatti forniti una volta esaminata la tua
		richiesta
	</p>
	<form class="form" on:submit|preventDefault={handleSubmit}>
		<div class="formWrapper">
			<div class="formComponent">
				<label for="nome">Nome</label>
				<input
					type="text"
					id="nome"
					bind:value={nome}
					placeholder="Il tuo nome"
				/>
			</div>

			<div class="formComponent">
				<label for="cognome">Cognome</label>
				<input
					type="text"
					id="cognome"
					bind:value={cognome}
					placeholder="Il tuo cognome"
				/>
			</div>

			<div class="formComponent">
				<label for="telefono">Numero di telefono</label>
				<input
					type="tel"
					id="telefono"
					bind:value={telefono}
					placeholder="+39 123 4567890"
				/>
			</div>

			<div class="formComponent">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="esempio@email.it"
				/>
			</div>

			<div class="formComponent">
				<label for="tipoProblema">Tipo di problema</label>
				<select id="tipoProblema" bind:value={tipoProblema}>
					<option value="">Seleziona un tipo di problema</option>
					{#each tipiProblema as { value, label }}
						<option {value}>{label}</option>
					{/each}
				</select>
			</div>

			<div class="formComponent">
				<label for="richiesta">Richiesta</label>
				<textarea
					id="richiesta"
					bind:value={richiesta}
					placeholder="Descrivi il tuo problema..."
					maxlength="500"
				></textarea>
				<div class="caratteri-rimasti">
					Caratteri rimasti: {500 - (richiesta?.length || 0)}
				</div>
			</div>

			<button type="submit" class="submitButton"> Invia </button>
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
		width: 40vw;
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

	input[type="text"],
	input[type="email"],
	input[type="tel"],
	select,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 6px;
		transition: border-color 0.2s ease;
		font-size: 1rem;
	}

	textarea {
		min-height: 120px;
		resize: vertical;
	}

	.caratteri-rimasti {
		font-size: 0.875rem;
		color: #666;
		margin-top: 0.5rem;
		text-align: right;
	}

	input:focus,
	textarea:focus,
	select:focus {
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
	}

	.submitButton:hover {
		background: #df627b;
	}

	@media (max-width: 768px) {
		.form {
			width: 90vw;
			padding: 1.5rem;
		}

		input[type="text"],
		input[type="email"],
		input[type="tel"],
		select,
		textarea {
			padding: 0.625rem;
		}
	}

	h1 {
		margin: 0;
	}

	p {
		margin-bottom: 2vw;
	}
</style>
