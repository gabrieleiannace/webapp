# Storia

- Nato nel 2006 come progetto personale di Graydon Hoare, un dipendente di Mozilla Research, nel 2009 ha ricevuto una prima sponsorizzazione da parte di Mozilla, poi è diventato open source.
- Rust 1.0 - 15 maggio 2015.
- Versioni successive rilasciate costantemente ogni 6 settimane.
- Rust 1.66.0 - 12 dicembre 2022.
- Usato in produzione in molti contesti:
    - Firefox contiene 3M LoC scritte in Rust (9%).
    - Dropbox usa Rust nel suo motore di sincronizzazione.
    - npm usa Rust per implementare il servizio di autorizzazione del registry.
    - deno, il successore di node.js, è scritto in Rust.
    - Amazon Web Services usa Rust (progetto Firecracker) per ottenere alte prestazioni in servizi come Lambda, EC2, S3,...
    - Microsoft ha portato tutta l'API Windows in Rust ([https://github.com/microsoft/windows-rs](https://github.com/microsoft/windows-rs)).

# Evoluzione

- [https://github.com/dtolnay/star-history](https://github.com/dtolnay/star-history).

# Obiettivi del linguaggio

- Offrire un linguaggio per la programmazione di sistema privo di comportamenti non definiti, concorrente e pratico.
- I linguaggi esistenti, ad un livello di astrazione ed efficienza simile, sono soggetti a molteplici limiti:
    - Poca attenzione alla sicurezza (safety) dei costrutti.
    - Scarso supporto alla correttezza formale dell'esecuzione concorrente.
    - Mancano di strumenti di corredo a supporto della creazione, condivisione e messa in campo.
    - Offrono un controllo limitato sull'uso delle risorse computazionali.
- Offrire astrazioni a costo nullo per la maggior parte degli idiomi di programmazione.
    - Permettendo al programmatore di adottare lo stile preferito nella scrittura di un algoritmo (iterazione, ricorsione, chiusure, ...) e garantendo la generazione del miglior codice assembler possibile, senza introdurre costi aggiuntivi per funzionalità non richieste.
    - [https://boats.gitlab.io/blog/post/zero-cost-abstractions/](https://boats.gitlab.io/blog/post/zero-cost-abstractions/).
- Supportare la produttività del programmatore.
    - Offrendo costrutti di alto livello ed un ecosistema di compilazione/gestione delle dipendenze/test integrato.

## Esempio

```rust
fn main() {
    let mut v = vec![1, 2, 3, 4, 5];
    v.push(6);
    println!("{:?}", v);
}

```

# Presupposti di base

- Linguaggio compilato (non basato su bytecode).
- Fortemente tipizzato in fase di compilazione.
- Paradigma imperativo, ma con aspetti funzionali.
- Non ha né garbage collection né ambiente di supporto all'esecuzione.
- Sistema dei tipi sofisticato.

# Confronto

## Controllo / Prestazioni

- C.
- Rust.
- C++.
- Go.
- Java.
- Python.
- ML.

## Sicurezza

Rust si appoggia ad un sistema di validazione dei tipi in fase di compilazione che impedisce (per i programmi che non fanno uso delle estensioni unsafe) i seguenti tipi di errore:

- Dangling pointer - uso di puntatori ad aree di memoria GIÀ rilasciate.
- Doppi rilasci - tentativo di restituire al S.O. un'area di memoria già rilasciata.
- Corse critiche - accesso a dati il cui contenuto è indeterminato a seguito di eventi fuori dal controllo del programma stesso (ordine di schedulazione, attese legate all'I/O, ...).
- Buffer overflow - tentativi di accedere ad aree di memoria contigue a quelle possedute da una variabile, ma non di sua pertinenza.
- Iteratori invalidi - accesso iterativo (uno alla volta) agli elementi contenuti in una collezione che viene modificata mentre l'iterazione è in corso.
- Overflow aritmetici (solo in modalità debug) - esecuzione di operazioni aritmetiche che, a seguito della limitata capacità di rappresentazione dei numeri binari, portano ad errori grossolani (2_000_000_000 + 2_000_000_000 = -294_967_296).

Il linguaggio favorisce l'uso di costrutti immutabili e propone convenzioni volte a limitare il rischio di compromissione dei dati.

## vs Python

- Molto più veloce.
- Normalmente destinato a contesti differenti.
- Minor consumo di memoria.
- Vero multi-threading.
- Tipi algebrici.
- Approccio all'ereditarietà differente.
- Pattern matching.
- Linguaggio staticamente tipato: molti meno arresti anomali in fase di esecuzione.

## vs Java

- Nessun overhead causato dalla JVM: non si verificano pause causate dal Garbage Collector.
- Minor consumo di memoria.
- Nessun costo di astrazione.
- Approccio all'ereditarietà ed alla programmazione generica differente.
- Pattern matching.
- Sistema di compilazione unico.
- Gestione delle dipendenze integrata.

## vs C/C++

- Nessun segmentation fault.
- Nessun buffer overflow.
- Nessun null pointer.
- Nessuna corsa critica.
- Sistema dei tipi più elaborato.
- Approccio all'ereditarietà differente.
- Processo di costruzione unificato.
- Gestione delle dipendenze integrata.

## vs Go

- Nessuna pausa a causa del Garbage Collector.
- Minor consumo di memoria.
- Nessun null pointer.
- Migliore gestione degli errori.
- Programmazione concorrente sicura.
- Sistema dei tipi più solido.
- Approccio all'ereditarietà differente.
- Nessun costo di astrazione.
- Gestione delle dipendenze.

Questo documento presenta una panoramica del linguaggio di programmazione Rust, con un focus sulla sua storia, obiettivi, presupposti di base e confronto con altri linguaggi come C, C++, Java, Python e Go. Rust è un linguaggio staticamente e fortemente tipato, adatto alla programmazione di sistema, che offre un controllo totale dell'uso della memoria e ottimizza al massimo il codice generato. Il linguaggio si appoggia ad un sistema di validazione dei tipi in fase di compilazione che impedisce molti tipi di errori, favorendo l'uso di costrutti immutabili e proponendo convenzioni volte a limitare il rischio di compromissione dei dati.