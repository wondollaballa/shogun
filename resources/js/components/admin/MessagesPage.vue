<template>
    <div id="message-component">
        <h2>Messages</h2>
        <div id="message-container">
            <div id="messages-new" class="message-list">
                <h5>{{ messageNew.length }} - New</h5>
                <div id="messages-item-grid">
                    <div class="messages-item" v-for="(newValue, newKey) in messageNew" v-bind:key="'new-'+newKey">
                        <h4>{{ newValue.name }}</h4>
                        <span>{{ newValue.formatCreatedAt }}</span>
                        <p>{{ newValue.email }}</p>
                        <p>{{ newValue.message }}</p>
                        <button class="pure-button pure-u-1 pure-button-primary" @click="updateStatus(newValue.id,2)">Read</button>
                    </div>
                </div>
            </div>
            <div id="messages-viewed" class="message-list">
                <h5>{{ messageViewed.length }} - Observed</h5>
                <div id="messages-item-grid">
                    <div class="messages-item" v-for="(viewedValue, viewedKey) in messageViewed" v-bind:key="'viewed-'+viewedKey">
                        <h4>{{ viewedValue.name }}</h4>
                        <span>{{ viewedValue.formatViewed }}</span>
                        <p>{{ viewedValue.email }}</p>
                        <p>{{ viewedValue.message }}</p>
                        <button class="pure-button pure-u-1 pure-button-primary" @click="updateStatus(viewedValue.id, 3)">Replied</button>
                    </div>
                </div>
            </div>
            <div id="messages-responded" class="message-list">
                <h5>{{ messageReplied.length }} - Replied</h5>
                <div id="messages-item-grid">
                    <div class="messages-item" v-for="(repliedValue, repliedKey) in messageReplied" v-bind:key="'replied-'+repliedKey">
                        <h4>{{ repliedValue.name }}</h4>
                        <span>{{ repliedValue.formatUpdatedAt }}</span>
                        <p>{{ repliedValue.email }}</p>
                        <p>{{ repliedValue.message }}</p>
                        <button class="pure-button pure-u-1" @click="updateStatus(repliedValue.id, 2)">Undo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./messages_page.ts"></script>
