const $tbody = document.querySelector("tbody");
// console.log()
let arena = "";
let entities = "";

const tabOf = [
	document.querySelector("#div-close-or-open"),
	document.querySelector("#Xcoordinate"),
	document.querySelector("#Zcoordinate"),
	document.querySelector("#Entitieschoose"),
	document.querySelector("#BTNspawn"),
];

document.addEventListener("DOMContentLoaded", async () => {
	arena = await arenaGet();
	entities = await arenaEntitieGet();

	transformPageByArenaStatus(arena.status);
	for (let i = 0; entities.length; i++) {
		console.log(entities[i].entity.icon)
		createTabRow(
			entities[i].entity.icon,
			entities[i].entity.name,
			entities[i].x,
			entities[i].z,
			entities[i].entity.strength,
		);
	}
	console.log(entities);
	setInterval(async () => {
		arena = await arenaGet();
		transformPageByArenaStatus(arena.status);
		console.log(entities);
		for (let i = 0; entities.length; i++) {
			createTabRow(
				entities[i].entity.icon,
				entities[i].entity.name,
				entities[i].x,
				entities[i].z,
				entities[i].entity.strength,
				entities[i].id,
			);
		}
	}, "10000");

	console.log(await PostByName());
});

async function arenaGet() {
	const reponse = await fetch(API + "arena")
	const data = await reponse.json();
	console.log(data)
	return data;
}

async function arenaEntitieGet() {
	const reponse = await fetch(API + "arena/entities", {
		method: "GET",
	});
	const data = await reponse.json();
	return data;
}

async function deleteMobsById(id) {
	const reponse = await fetch(API + "arena/entities/" + id, {
		method: "DELETE",
	});
	const data = await reponse.json();
	return data;
}

async function PostByName(name) {
	const reponse = await fetch(API + "arena/entities", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			entityId: 5,
			x: 10,
			z: 5,
		}),
	});
	const data = await reponse.json();
	return data;
}

function transformPageByArenaStatus(status) {
	let btns = document.querySelectorAll("#elem-tr");
	if (status == "open") {
		for (let i = 0; i < tabOf.length; i++) {
			tabOf[i].classList.remove("close");
			tabOf[i].classList.remove("greyOnClose");
		}
		for (let i = 0; i < btns.length; i++) {
			btns[i].classList.remove("close");
			btns[i].classList.remove("greyOnClose");
		}
	} else {
		for (let i = 1; i < tabOf.length; i++) {
			tabOf[i].classList.add("close");
			tabOf[i].classList.add("greyOnClose");
		}
		for (let i = 0; i < btns.length; i++) {
			btns[i].classList.add("close");
			btns[i].classList.ad("greyOnClose");
		}
	}
}

function createTabRow(img, name, x, y, str, id) {
	const mobss = document.querySelectorAll("#mobs");
	const newtab = [img, name, x, y, str];
	for (let i = 0; i < mobss.length; i++) {
		mobss[i].remove();
	}

	const $tr = document.createElement("tr");
	$tr.id = "mobs";

	const $td = document.createElement("td");
	const $img = document.createElement("img");
	$img.setAttribute("src", img);

	$td.appendChild($img);
	$tr.appendChild($td);

	for (let i = 1; i < newtab.length; i++) {
		const $th = document.createElement("td");
		$th.textContent = newtab[i];
		$th.id = "elem-tr";
		$th.classList.add("grey");
		$tr.appendChild($th);
	}

	const btn = document.createElement("button");
	btn.classList.add("delete");
	btn.id = "elem-tr";
	btn.textContent = "DELETE";

	const $deleteTd = document.createElement("td");

	$deleteTd.appendChild(btn);
	$tr.appendChild($deleteTd);

	$tbody.appendChild($tr);

	btn.addEventListener("click", async () => {
		$tr.remove();
		let test = await deleteMobsById(id);
		console.log(entities, id, test);
	});
}
