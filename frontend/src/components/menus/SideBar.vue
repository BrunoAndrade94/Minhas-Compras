<template>
	<div class="card flex justify-content-center">
		<Sidebar>
			<div class="menu-topo">
				<h2>O MENU DA FAMILIA</h2>
			</div>
			<div class="itens-sidebar">
				<div>
					<router-link to="/produtos">
						<i class="pi pi-box"></i>
						<span>Novos Produtos</span>
					</router-link>
				</div>
				<hr />
				<div>
					<router-link to="/comprar">
						<i class="pi pi-box"></i>
						<span>Nova Compra</span>
					</router-link>
				</div>
				<hr />
				<div>
					<router-link to="/nova_tela">
						<i class="pi pi-box"></i>
						<span>Ajustes</span>
					</router-link>
				</div>
				<hr />
			</div>
		</Sidebar>
		<Button
			class="botao-sidebar"
			icon="pi pi-list"
			@click="visible = true"
			text
			style="color: white"
		/>
	</div>
</template>

<script>
export default {
	name: "SideBar",
	data() {
		return {
			visible: false,
		};
	},
};
</script>

<style>
.botao-sidebar:hover {
	color: red;
}

.itens-sidebar a {
	text-decoration: none;
	color: blue;
}

.menu-topo {
	color: gray;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
