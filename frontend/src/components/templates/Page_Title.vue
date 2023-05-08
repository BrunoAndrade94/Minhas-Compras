<template>
	<div class="page_title">
		<h1>
			<i v-if="icon" :class="icon" style="font-size: 2rem"></i
			>{{ main_title }}
		</h1>
		<h2>{{ sub_title }}</h2>
		<hr />
	</div>
</template>

<script>
export default {
	name: "Page_Title",
	props: ["icon", "sub_title", "main_title"],
};
</script>

<style scoped>
h1 i {
	margin: 10px;
}
.page_title h1 {
	margin: 0;
	color: rgb(204, 178, 178);
}
.page_title h2 {
	color: #777;
	margin-top: 5px;
	font-size: 1.3rem;
}
</style>
