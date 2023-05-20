<template>
	<header class="header">
		<h1 class="title">
			<router-link to="/home">
				{{ title }}
			</router-link>
		</h1>
	</header>
</template>

<script>
import SideBar from "../menus/SideBar.vue";

export default {
	name: "Header",
	components: { SideBar },
	props: {
		title: String,
		hide_toggle: Boolean,
	},
	data() {
		return {};
	},
	methods: {
		toggle_menu() {
			this.$store.commit("toggle_menu");
		},
	},
};
</script>

<style>
.header {
	grid-area: header;
	background: linear-gradient(to right, #1e469a, #49a7c1);

	color: #fff;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
}
.title {
	margin-left: 20px;
	font-size: 1.2rem;
	color: #fff;
	font-weight: 100;
	flex-grow: 1;
}

.title a {
	color: #fff;
	text-decoration: none;
}

.title a:hover {
	color: burlywood;
}

header.header > a.toggle {
	width: 60px;
	height: 100%;
	color: #fff;
	justify-self: flex-start;
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
}
header.header > a.toggle:hover {
	color: #fff;
	background-color: rgba(0, 0, 0, 0.2);
}
</style>
