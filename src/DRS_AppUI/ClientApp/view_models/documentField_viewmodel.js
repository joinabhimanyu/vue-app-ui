/** @author Abhimanyu Chkarborty
 * @description view model for document field component
 */
export default {
    data() {
        const validateDocumentFields = (rule, value, callback) => {
            if (!value || value === 0) {
                callback(new Error(this.$t('select_field')));
            } else callback();
        };
        return {
            // fields form rules
            documentFieldFormRules: {
                fieldId: {
                    validator: validateDocumentFields,
                    trigger: 'blur',
                },
            },
            // document fields variables
            loadingDialogDocumentField: false,
            documentFields: [],
            loadingFields: false,
            fieldList: [],
            loadingParameters: false,
            parameterList: [],
            documentFieldsTotal: 0,
            selectedDocumentField: {},
            documentFieldsModalMode: '',
            loadingDocumentFields: false,
            showDocumentFieldsDialog: false,
            documentFieldsTableProps: {
                maxHeight: 270,
                highlightCurrentRow: true,
                // rowKey: row => {
                //   return row.fieldId || 0;
                // }
            },
            documentFieldsFilter: [{
                props: [],
                vals: '',
            } ],
            documentFieldsFilterOption: [{
                    label: this.$t('field_name'),
                    value: 'Field.Name',
                },
                {
                    label: this.$t('field_description'),
                    value: 'Field.Description',
                },
                {
                    label: this.$t('name'),
                    value: 'Name',
                },
                {
                    label: this.$t('value'),
                    value: 'Value',
                },
                {
                    label: this.$t('parameter'),
                    value: 'Parameter',
                },
            ],
            documentFieldsFilterValue: '',
            documentFieldCols: [{
                    prop: 'fieldName',
                    label: this.$t('field_name'),
                },
                {
                    prop: 'fieldDescription',
                    label: this.$t('field_description'),
                },
                {
                    prop: 'fieldDataTypeNo',
                    label: this.$t('data_type'),
                },
                {
                    prop: 'isActive',
                    label: this.$t('is_active'),
                },
                {
                    prop: 'parameter',
                    label: this.$t('parameter'),
                },
                {
                    prop: 'externalFieldname',
                    label: this.$t('external_field_name'),
                },
                {
                    prop: 'fixedValue',
                    label: this.$t('fixed_value'),
                },
            ],
        };
    },
};