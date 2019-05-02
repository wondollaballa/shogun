<template>
    <nav v-bind:class="state">
        <div id="nav-left-header">
            <div id="hamburger-left" class="tooltips">
                <i class="fas fa-chevron-right" @click="toggleMenu" v-if="state === 'closed'"></i>
                <span class="tooltip-wrapper">
                    <span class="tooltip right-icon">Maximize the sidebar</span>
                </span>
            </div>
            <div id="nav-left-title" v-if="state === 'opened'">
                <a id="logo-link" href="/dashboard"><div></div></a>
            </div>
            <div id="hamburger-right" class="tooltips" v-if="state === 'opened'">
                <i class="fas fa-chevron-left" @click="toggleMenu"></i>
                <span class="tooltip-wrapper ">
                    <span class="tooltip right-icon">Minimize the sidebar</span>
                </span>
            </div>
        </div>
        <div id="nav-left-content">
            <a href="/dashboard" class="menu-item-header left-row active" :class="state === 'closed' ? 'menu-closed': 'menu-opened'">
                <span class="notifications" :class="[reservationCount > 0 ? 'notifications-alive' : 'notifications-dead', animateNotificationCounts ? 'animated bounce' : '']" >{{ reservationCount }}</span>
                <div class="left-content-min-row tooltips">
                    <i class="fas fa-columns"></i>
                    <span class="tooltip-wrapper" v-if="state === 'closed'">
                        <span class="tooltip right-icon">Dashboard</span>
                    </span>
                </div>
                <div class="left-content-max-row" v-if="state === 'opened'">
                    <p>Dashboard</p>
                </div>
            </a>

            <div class="left-row-dropdown" status="closed" :class="state === 'closed' ? 'menu-closed': 'menu-opened'" @click="toggleDropdown">
                <div class="menu-item-header left-row-dropdown-header">
                    <span class="notifications" :class="totalReservationCount > 0 ? 'notifications-alive' : 'notifications-dead'">{{ totalReservationCount }}</span>
                    <div class="left-content-min-row tooltips">
                        <i class="fas fa-clipboard-list"></i>
                        <span class="tooltip-wrapper" v-if="state === 'closed'">
                            <span class="tooltip right-icon">Reservations</span>
                        </span>
                    </div>
                    <div class="left-content-max-row" v-if="state === 'opened'">
                        <p>Reservations</p>
                    </div>
                    <div class="left-content-dropdown-column" v-if="state === 'opened'">
                        <i id="down" class="fas fa-chevron-circle-down"></i>
                        <i id="up" class="fas fa-chevron-circle-up"></i>
                    </div>
                </div>
                <div class="left-content-sub-menu">
                    <h4>Reservations</h4>
                    <a href="/rules">
                        <i class="fas fa-calendar-check"></i>
                        <span>Rules</span>
                    </a>
                    <a href="/reservations">
                        <i class="fas fa-calendar-plus"></i>
                        <span>New Reservation</span>
                    </a>
                </div>
            </div>
            <a href="/messages" class="menu-item-header left-row" :class="state === 'closed' ? 'menu-closed': 'menu-opened'">
                <span class="notifications" :class="[messagesCount > 0 ? 'notifications-alive' : 'notifications-dead', animateMessageCounts ? 'animated bounce' : '']">{{ messagesCount }}</span>
                <div class="left-content-min-row tooltips">
                    <i class="fas fa-envelope-square"></i>
                    <span class="tooltip-wrapper" v-if="state === 'closed'">
                        <span class="tooltip right-icon">Messages</span>
                    </span>
                </div>
                <div class="left-content-max-row" v-if="state === 'opened'">
                    <p>Messages</p>
                </div>
            </a>
        </div>
        <div id="nav-left-footer">
        </div>
    </nav>
</template>

<script lang="ts" src="./leftbar.ts"></script>
