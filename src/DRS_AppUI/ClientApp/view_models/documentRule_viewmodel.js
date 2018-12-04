/** @author Abhimanyu Chkarborty
 * @description view model for document rule component
 */
export default {
    data() {
        const validateRulesProcessSchema = (rule, value, callback) => {
            if (!value || value === 0) {
                callback(new Error(this.$t('select_process_schema')));
            } else callback();
        };
        return {
            pickerOptions: {
                shortcuts: [{
                        text: this.$t('today'),
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        },
                    },
                    {
                        text: this.$t('yesterday'),
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        },
                    },
                    {
                        text: this.$t('a_week_ago'),
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        },
                    },
                ],
            },
            // rule settings form rules
            ruleSettingsFormRules: {
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
            // document rule form rules
            rulesFormRules: {
                documentRuleGuid: [{
                        required: true,
                        message: this.$t('document_rule_guid_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
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
                updated: [{
                    required: true,
                    message: this.$t('updated_blank'),
                    trigger: 'blur',
                }],
                updatedBy: [{
                    required: true,
                    message: this.$t('updated_by_blank'),
                    trigger: 'blur',
                }],
                processSchemaId: [{
                    validator: validateRulesProcessSchema,
                    trigger: 'blur',
                }],
            },
            // schema step settings variables
            schemaStepSettings: [],
            schemaStepSettingsTotal: 0,
            loadingSchemStepSettings: false,
            schemaStepSettingsTableProps: {
                maxHeight: 270,
                highlightCurrentRow: true,
                rowKey: row => row.processSchemaStepSettingId || 0,
            },
            schemaStepSettingsFilter: [{
                props: [],
                vals: '',
            }],
            schemaStepSettingsFilterOption: [{
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
            schemaStepSettingsFilterValue: '',
            schemaStepSettingsCols: [{
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
                    prop: 'updated',
                    label: this.$t('updated'),
                },
            ],
            // rule settings varibales
            loadingDialogDocumentRuleSettings: false,
            ruleSettings: [],
            ruleSettingsTotal: 0,
            selectedRuleSetting: {},
            ruleSettingsModalMode: '',
            loadingRuleSettings: false,
            showRuleSettingsDialog: false,
            ruleSettingsTableProps: {
                maxHeight: 270,
                highlightCurrentRow: true,
                rowKey: row => row.documentRuleSettingId || 0,
            },
            ruleSettingsFilter: [{
                props: [],
                vals: '',
            }],
            ruleSettingsFilterOption: [{
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
            ruleSettingsFilterValue: '',
            ruleSettingsCols: [{
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
                    prop: 'updated',
                    label: this.$t('updated'),
                },
            ],

            // document rule variables
            loadingDialogDocumentRule: false,
            toggleRuleSettings: false,
            documentRules: [],
            rulesProcessSchemaList: [],
            loadingRulesProcessSchema: false,
            rulesTotal: 0,
            selectedRule: {},
            rulesModalMode: '',
            loadingRules: false,
            showRuleDialog: false,
            rulesTableProps: {
                maxHeight: 270,
                highlightCurrentRow: true,
                rowKey: row => row.documentRuleId || 0,
            },
            rulesFilter: [{
                props: [],
                vals: '',
            }],
            rulesFilterOption: [{
                    label: this.$t('rule_order'),
                    value: 'RuleOrder',
                },
                {
                    label: this.$t('field_query_rule'),
                    value: 'FieldQueryRule',
                },
                {
                    label: this.$t('name'),
                    value: 'Name',
                },
                {
                    label: this.$t('description'),
                    value: 'Description',
                },
            ],
            rulesFilterValue: '',
            ruleCols: [{
                    prop: 'ruleOrder',
                    label: this.$t('order'),
                },
                {
                    prop: 'isActive',
                    label: this.$t('is_active'),
                },
                {
                    prop: 'name',
                    label: this.$t('name'),
                },
                {
                    prop: 'description',
                    label: this.$t('description'),
                },
                {
                    prop: 'fieldQueryRule',
                    label: this.$t('field_query_rule'),
                },
                {
                    prop: 'processSchema',
                    label: this.$t('process_schema'),
                },
            ],
        };
    },
};