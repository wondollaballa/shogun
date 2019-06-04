<template>
    <nav v-bind:class="state">
        <div id="nav-right-header">

            <div id="hamburger-right" v-on:click="toggleMenu">
                <i class="fas fa-ellipsis-v" v-if="state === 'closed'"></i>
                <i class="fas fa-ellipsis-h" v-if="state === 'opened'"></i>
            </div>
        </div>
        <div id="nav-right-content" v-if="state === 'opened'">
            <!-- config -->
            <a v-bind:href="users" class="right-row">
                <span>Users</span>

                <div class="">
                    <i class="fas fa-sliders-h"></i>
                </div>
            </a>
            <!-- menu -->
            <a v-bind:href="menus" class="right-row">
                <span>Menu</span>

                <div class="">
                    <i class="fas fa-utensils"></i>
                </div>
            </a>
            <!-- page -->
            <a v-bind:href="editing" class="right-row">
                <span>Page</span>

                <div class="">
                    <i class="fas fa-edit"></i>
                </div>
            </a>
            <!-- logout -->
            <a v-bind:href="logout" class="right-row">
                <span>logout</span>

                <div class="">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
            </a>
        </div>
        <div id="nav-right-footer" v-if="state === 'opened'">
        </div>
    </nav>
</template>

<script lang="ts" src="./rightbar.ts"></script>
