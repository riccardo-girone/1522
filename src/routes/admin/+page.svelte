<script>
	import { onMount } from "svelte";
	let richieste = [];
	let note = "";
	let richiestaInCorso = null; // Memorizziamo la richiesta che l'operatore sta trattando

	// Funzione per caricare le richieste
	async function caricaRichieste() {
		const response = await fetch("http://localhost:3001/richieste");
		const data = await response.json();
		if (data.richieste) {
			richieste = data.richieste;
		}
	}

	// Funzione per chiudere una richiesta
	async function chiudiRichiesta(id_richiesta) {
		if (!note.trim()) {
			alert("Devi aggiungere delle note prima di chiudere la richiesta.");
			return;
		}

		const response = await fetch(
			`http://localhost:3001/richieste/${id_richiesta}/chiudi`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ note }), // Invia le note al backend
			},
		);

		const data = await response.json();
		if (data.message) {
			alert(data.message);
			caricaRichieste(); // Ricarica le richieste dopo averle chiuse
			richiestaInCorso = null; // Resetta la richiesta in corso
			note = ""; // Resetta il campo note
		} else {
			alert("Errore durante la chiusura della richiesta");
		}
	}

	// Funzione per selezionare la richiesta e mostrare la sezione delle note
	function mostraNote(richiesta) {
		richiestaInCorso = richiesta;
		note = ""; // Reset delle note
	}

	onMount(() => {
		caricaRichieste();
	});
</script>

<h1>Gestione Richieste</h1>

{#if richieste.length > 0}
	<div>
		{#each richieste as richiesta}
			<div class="richiesta">
				<p><strong>Nome vittima:</strong> {richiesta.nome_vittima}</p>
				<p><strong>Contatto:</strong> {richiesta.contatto_vittima}</p>
				<p>
					<strong>Tipo di violenza:</strong>
					{richiesta.tipo_di_violenza}
				</p>
				<p>
					<strong>Descrizione:</strong>
					{richiesta.descrizione_richiesta}
				</p>
				<p>
					<strong>Data e Ora:</strong>
					{new Date(richiesta.data_ora).toLocaleString()}
				</p>

				{#if richiesta.esito === 0}
					<button
						class="chiudi-btn"
						on:click={() => mostraNote(richiesta)}
					>
						Aggiungi note e chiudi
					</button>
				{:else}
					<p><strong>Richiesta chiusa</strong></p>
				{/if}
			</div>
		{/each}
	</div>

	{#if richiestaInCorso}
		<div class="note-section">
			<h3>
				Aggiungi note per la richiesta {richiestaInCorso.id_richiesta}
			</h3>
			<textarea
				class="note-textarea"
				bind:value={note}
				placeholder="Inserisci le note..."
			></textarea>
			<button
				on:click={() => chiudiRichiesta(richiestaInCorso.id_richiesta)}
				class="chiudi-btn"
			>
				Chiudi richiesta con note
			</button>
		</div>
	{/if}
{:else}
	<p>Nessuna richiesta disponibile.</p>
{/if}

<style>
	.richiesta {
		margin: 10px 0;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.chiudi-btn {
		background-color: red;
		color: white;
		padding: 5px 10px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.chiudi-btn:hover {
		background-color: darkred;
	}

	.note-section {
		margin-top: 15px;
	}

	.note-textarea {
		width: 100%;
		height: 100px;
		margin-top: 5px;
	}
</style>
