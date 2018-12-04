/** @author Abhimanyu Chkarborty
 * @description view model for process log component
 */
export default {
    data() {
        return {
            // process logs variables
            processLogs: [],
            processLogsTotal: 0,
            loadingProcessLogs: false,
            processLogsTableProps: {
                maxHeight: 270,
                highlightCurrentRow: true,
                rowKey: row => row.processLogId || 0,
            },
            processLogsFilter: [{
                props: [],
                vals: '',
            }],
            processLogsFilterOption: [{
                    label: this.$t('processQueue'),
                    value: 'ProcessQueue.DocumentKey',
                },
                {
                    label: this.$t('processHandler'),
                    value: 'ProcessHandler.Name',
                },
                {
                    label: this.$t('message'),
                    value: 'Message',
                },
            ],
            processLogsFilterValue: '',
            processLogsCols: [{
                    prop: 'timestamp',
                    label: this.$t('timestamp'),
                },
                {
                    prop: 'state',
                    label: this.$t('state'),
                },
                {
                    prop: 'processQueue',
                    label: this.$t('processQueue'),
                },
                {
                    prop: 'processHandler',
                    label: this.$t('processHandler'),
                },
                {
                    prop: 'message',
                    label: this.$t('message'),
                },
            ],
        };
    },
};