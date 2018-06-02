<template>
    <div class="d-flex bg-light p-2 align-items-center">
        <div>
            <slot name="info" :from="from" :to="to" :totalItems="totalItems">
                <template v-if="totalItems > 0">
                    From {{ from }} to {{ to }} on {{ totalItems }} result(s)
                </template>
                <template v-else>
                    No results
                </template>
            </slot>
        </div>

        <div class="ml-auto d-flex">
            <template v-if="showRefreshButton">
                <button class="btn btn-sm btn-outline-secondary mr-2" @click.prevent="selectPage(currentPage)">
                    <i class="fa fa-refresh pl-1 pr-1"></i>
                </button>
            </template>

            <ul class="pagination" v-if="total_pages > 1">
                <li class="page-item" v-if="useFirstLastLinks" :class="{ disabled: is_first_page }">
                    <a class="page-link" @click.prevent="selectPage(1)" href="" v-html="firstText"></a>
                </li>
                <li class="page-item" v-if="useNextPrevLinks" :class="{ disabled: is_first_page }">
                    <a class="page-link" @click.prevent="selectPage(currentPage - 1)" href="" v-html="previousText"></a>
                </li>
                <li class="page-item" v-for="(page, index) in pages" :key="index" :class="{ active: page.active }">
                    <a class="page-link" @click.prevent="selectPage(page.number)" :disabled="!page.active" href="">{{ page.label }}</a>
                </li>
                <li class="page-item" v-if="useNextPrevLinks" :class="{ disabled: is_last_page }">
                    <a class="page-link" @click.prevent="selectPage(currentPage + 1)" href="" v-html="nextText"></a>
                </li>
                <li class="page-item" v-if="useFirstLastLinks" :class="{ disabled: is_last_page }">
                    <a class="page-link" @click.prevent="selectPage(total_pages)" href="" v-html="lastText "></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import vueTablePaginationMixin from './mixins/vueTablePaginationMixin'

    export default {
        mixins: [vueTablePaginationMixin],
    }
</script>
