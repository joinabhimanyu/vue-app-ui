/** @author Abhimanyu Chkarborty
 * @description view model for documents component
 */
export default {
  data() {
    const validateDocumentSource = (rule, value, callback) => {
      if (!value || value === 0) {
        callback(new Error(this.$t('select_document_source')));
      } else callback();
    };
    // const validatePages = (rule, value, callback) => {
    //   if (!value && value == 0) {
    //     callback(new Error(this.$t('pages_blank')));
    //   } else callback();
    // };
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
      // document form rules
      documentFormRules: {
        documentIdentity: [{
          required: true,
          message: this.$t('document_identity_blank'),
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
        documentSourceId: [{
          validator: validateDocumentSource,
          trigger: 'change',
        }],
      },
      documentSourceFilterValue: '',
      loadingDocumentSource: false,
      // document variables
      loadingDialogDocuments: false,
      documentsTotal: 0,
      selectedDocument: {},
      documentSourceList: [],
      documentModalMode: '',
      loadingDocuments: false,
      showDocumentDialog: false,
      documentTableProps: {
        maxHeight: 270,
        highlightCurrentRow: true,
        rowKey: row => row.documentId || 0,
      },
      documentSource: [],
      documentsFilter: [{
        props: [],
        vals: '',
      }],
      documentsFilterOption: [{
        label: this.$t('document_identity'),
        value: 'DocumentIdentity',
      },
      {
        label: this.$t('number'),
        value: 'Number',
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
      documentsFilterValue: '',
      documentCols: [{
        prop: 'documentIdentity',
        label: this.$t('document_identity'),
      },
      {
        prop: 'documentSource',
        label: this.$t('document_source'),
      },
      {
        prop: 'number',
        label: this.$t('number'),
      },
      {
        prop: 'version',
        label: this.$t('version'),
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
        prop: 'isActive',
        label: this.$t('is_active'),
      },
      {
        prop: 'updated',
        label: this.$t('updated'),
      },
      ],
    };
  },
};