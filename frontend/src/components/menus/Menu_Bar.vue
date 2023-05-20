<template>
	<div class="div">
		<Menubar :model="menu_bar">
			<template #end
				><div>
					ELA
					<i style="color: red" class="pi pi-spin pi-heart-fill"></i>
					UNO
				</div></template
			>
		</Menubar>
	</div>
</template>

<script>
export default {
	name: "Menu_Bar",
	data() {
		return {
			menu_bar: [
				{
					label: "Inicio",
					icon: "pi pi-fw pi-home",
					to: "/",
				},
				{
					label: "Produto",
					icon: "pi pi-fw pi-apple",
					items: [
						{
							label: "Incluir Produto",
							icon: "pi pi-fw pi-plus",
							to: "/produtos",
						},
						{
							label: "Produtos Cadastrados",
							icon: "pi pi-fw pi-list",
							to: "/produtos_cadastrados",
						},
					],
				},
				{
					label: "Compra",
					icon: "pi pi-fw pi-plus",
					items: [
						{
							label: "Nova Compra",
							icon: "pi pi-fw pi-cart-plus",
							to: "/comprar",
						},
						{
							label: "Compras Realizadas",
							icon: "pi pi-fw pi-list",
							to: "/compras_realizadas",
						},
					],
				},
				{
					label: "Ajustes",
					icon: "pi pi-fw pi-spin pi-cog",
					to: "/",
				},
			],
		};
	},
};
</script>

<style></style>
