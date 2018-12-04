/** @author Abhimanyu Chkarborty
 * @description view model for process queue component
 */
export default {
    data() {
        return {
            // process queue variables
            processQueues: [],
            processQueuesTotal: 0,
            loadingProcessQueues: false,
            processQueuesTableProps: {
                maxHeight: 270,
                highlightCurrentRow: true,
                rowKey: row => row.processQueueId || 0,
            },
            processQueuesFilter: [{
                props: [],
                vals: '',
            }],
            processQueuesFilterOption: [{
                    label: this.$t('document_key'),
                    value: 'DocumentKey',
                },
                {
                    label: this.$t('document_name'),
                    value: 'DocumentName',
                },
                {
                    label: this.$t('category'),
                    value: 'DocumentCategory',
                },
                {
                    label: this.$t('archive_key'),
                    value: 'DocumentArchiveKey',
                },
                {
                    label: this.$t('process_schema'),
                    value: 'ProcessSchema.Name',
                },
            ],
            processQueuesFilterValue: '',
            processQueuesCols: [{
                    prop: 'created',
                    label: this.$t('created'),
                },
                {
                    prop: 'stateId',
                    label: this.$t('state'),
                },
                {
                    prop: 'documentKey',
                    label: this.$t('document_key'),
                },
                {
                    prop: 'documentName',
                    label: this.$t('document_name'),
                },
                {
                    prop: 'documentCategory',
                    label: this.$t('category'),
                },
                {
                    prop: 'documentPages',
                    label: this.$t('pages'),
                },
                {
                    prop: 'documentArchiveKey',
                    label: this.$t('archive_key'),
                },
                {
                    prop: 'logStateId',
                    label: this.$t('log_state'),
                },
                {
                    prop: 'processErrorCount',
                    label: this.$t('retries'),
                },
                {
                    prop: 'processSchema',
                    label: this.$t('process_schema'),
                },
            ],
        };
    },
};