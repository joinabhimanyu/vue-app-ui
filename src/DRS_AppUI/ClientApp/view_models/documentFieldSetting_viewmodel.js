/** @author Abhimanyu Chkarborty
 * @description view model for document field setting component
 */
export default {
    data() {
        return {
            // document field settings rules
            documentFieldSettingsFormRules: {
                name: [{
                        required: true,
                        message: this.$t('name_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
                value: [{
                        required: true,
                        message: this.$t('value_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
                description: [{
                        required: true,
                        message: this.$t('description_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
            },
            // document field settings variables
            loadingDialogDocumentFieldSettings: false,
            documentFieldSettings: [],
            documentFieldSettingsTotal: 0,
            selectedDocumentFieldSetting: {},
            documentFieldSettingsModalMode: '',
            loadingDocumentFieldSettings: false,
            showDocumentFieldSettingsDialog: false,
            documentFieldSettingsTableProps: {
                maxHeight: 270,
                highlightCurrentRow: true,
                rowKey: row => row.documentFieldSettingId || 0,
            },
            documentFieldSettingsFilter: [{
                props: [],
                vals: '',
            }],
            documentFieldSettingsFilterOption: [{
                    label: this.$t('name'),
                    value: 'Name',
                },
                {
                    label: this.$t('value'),
                    value: 'Value',
                },
                {
                    label: this.$t('description'),
                    value: 'Description',
                },
            ],
            documentFieldSettingsFilterValue: '',
            documentFieldSettingsCols: [{
                    prop: 'name',
                    label: this.$t('name'),
                },
                {
                    prop: 'value',
                    label: this.$t('value'),
                },
                {
                    prop: 'description',
                    label: this.$t('description'),
                },
                {
                    prop: 'isActive',
                    label: this.$t('is_active'),
                },
            ],
        };
    },
};