<script>
	import { onMount } from "svelte";

	let data = "";
	let nome = "";
	let contatto = "";
	let tipoProblema = "";
	let richiesta = "";

	const tipiProblema = [
		{ value: "violenzaDomestica", label: "violenza domestica" },
		{ value: "violenzaVerbale", label: "violenza verbale" },
		{ value: "stolking", label: "stolking" },
		{ value: "altro", label: "altro" },
	];

	const handleSubmit = async () => {
		let errorMessages = [];

		if (errorMessages.length == 0) {
			try {
				const response = await fetch(
					"http://localhost:3001/richieste",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							data_ora: data,
							nome_vittima: nome,
							contatto_vittima: contatto,
							tipo_di_violenza: tipoProblema,
							descrizione_richiesta: richiesta,
						}),
					},
				);

				const result = await response.json();

				if (response.ok) {
					alert("Ticket inviato con successo!");
				} else {
					alert("Errore nell'invio del ticket: " + result.error);
				}
			} catch (error) {
				alert("Errore di connessione al server: " + error.message);
			}
		} else {
			alert(errorMessages.join("\n"));
		}
	};
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
				<label for="nome">data</label>
				<input type="datetime-local" id="data" bind:value={data} />
			</div>

			<div class="formComponent">
				<label for="nome">nome</label>
				<input
					type="text"
					id="nome"
					bind:value={nome}
					placeholder="Il tuo nome"
				/>
			</div>

			<div class="formComponent">
				<label for="contatto">Mail</label>
				<input
					type="email"
					id="contatto"
					bind:value={contatto}
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
					maxlength="1500"
				></textarea>
				<div class="caratteri-rimasti">
					Caratteri rimasti: {1500 - (richiesta?.length || 0)}
				</div>
			</div>

			<button type="submit" class="submitButton" on:click={handleSubmit}>
				Invia
			</button>
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
