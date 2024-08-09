<script lang="ts" setup></script>

<template>
	<div class="typing-indicator">
		<div class="typing-circle" />
		<div class="typing-circle" />
		<div class="typing-circle" />
		<div class="typing-shadow" />
		<div class="typing-shadow" />
		<div class="typing-shadow" />
	</div>
</template>

<style scoped lang="less">
.typing-indicator {
	width: 60px;
	height: 40px;
	position: relative;
	z-index: 4;
}

.typing-circle {
	width: 8px;
	height: 8px;
	position: absolute;
	border-radius: 50%;
	background-color: #328efe;
	left: 15%;
	transform-origin: 50%;
	animation: typing-circle7124 0.5s alternate infinite ease;
}

@keyframes typing-circle7124 {
	0% {
		top: 25px;
		height: 5px;
		border-radius: 50px 50px 25px 25px;
		transform: scale3d(1.7, 1, 1);
	}

	40% {
		height: 8px;
		border-radius: 50%;
		transform: scaleX(1, 1, 1);
	}

	100% {
		top: 15%;
	}
}

.typing-circle:nth-child(2) {
	left: 45%;
	animation-delay: 0.2s;
}

.typing-circle:nth-child(3) {
	left: auto;
	right: 15%;
	animation-delay: 0.3s;
}

.typing-shadow {
	width: 6px;
	height: 4px;
	border-radius: 50%;
	background-color: #328efe70;
	position: absolute;
	top: 30px;
	transform-origin: 50%;
	z-index: 3;
	left: 15%;
	filter: blur(2px);
	animation: typing-shadow046 0.5s alternate infinite ease;
}

@keyframes typing-shadow046 {
	0% {
		opacity: 1;
	}

	40% {
		opacity: 0.7;
	}

	100% {
		opacity: 0.4;
	}
}

.typing-shadow:nth-child(4) {
	left: 45%;
	animation-delay: 0.2s;
}

.typing-shadow:nth-child(5) {
	left: auto;
	right: 15%;
	animation-delay: 0.3s;
}
</style>
