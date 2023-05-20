<template>
	<div class="content">
		<Menu_Bar></Menu_Bar>
		<router-view></router-view>
	</div>
</template>

<script>
import Menu_Bar from "../menus/Menu_Bar.vue";

export default {
	name: "Content",
	components: { Menu_Bar },
};
</script>

<style>
.content {
	grid-area: content;
	background-color: #efefef;
	padding: 20px;
	/* background-color: #333; */
}
/* .menu-bar {
	display: flex;

	align-items: center;
	margin-top: 20px;
	align-content: end;
} */
</style>
