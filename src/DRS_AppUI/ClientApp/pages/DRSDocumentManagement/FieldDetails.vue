<template>
    <div>
      <v-card contextual-style="white">
            <div slot="body">
              <el-row>
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-dropdown @command="onCommandField">
                                <el-button type="primary"><t t="actions"></t><i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="save"><i class="fa fa-floppy-o fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="save"></t></span></el-dropdown-item>
                                    <el-dropdown-item command="refresh"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="refresh"></t></span></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form v-loading="loadingField"
                                     :label-position="'right'"
                                     label-width="158px"
                                     :model="field"
                                     ref="fieldForm"
                                     :rules="fieldFormRules"
                                     size="mini"
                                     status-icon>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item prop="name" :label="$t('name')">
                          <el-input v-model="field.name" 
                          :placeholder="$t('enter_name')" 
                          style="width:300px" @change="fieldFormFieldChanged"></el-input>
                        </el-form-item>
                        <el-form-item prop="description" :label="$t('description')">
                          <el-input v-model="field.description" 
                          :placeholder="$t('enter_description')" 
                          style="width:300px" @change="fieldFormFieldChanged"></el-input>
                        </el-form-item>
                        <el-form-item prop="fieldDataTypeNo" :label="$t('prefix_id')">
                          <el-input v-model="field.fieldDataTypeNo" 
                          :placeholder="$t('enter_prefix_id')" 
                          style="width:300px" @change="fieldFormFieldChanged"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('is_active')">
                          <el-checkbox v-model="field.isActive" @change="fieldFormFieldChanged"></el-checkbox>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-col>
              </el-row>
            </div>
      </v-card>
    </div>

</template>
<style scoped>
</style>
<script>
import Vue from 'vue';
import VCard from '../../components/Card';
import UtilityMixin from '../../mixins/utilityMixin';
import { eventBus } from '../../main';
import FieldDetailsViewModel from '../../view_models/fieldDetails_viewmodel';

const fieldApi = 'field';

export default {
  name: 'fieldDetails',
  components: {
    VCard,
  },
  mixins: [FieldDetailsViewModel, UtilityMixin],
  props: {
    args: {
      type: Object,
      required: true,
    },
  },
  methods: {
    resetCurrentField() {
      this.field = {};
    },
    resetAfterSave() {
      this.resetCurrentField();
      this.loadFieldDetails();
    },
    saveFieldToDB() {
      const self = this;
      self
        .saveToDB()
        .then(_ => {
          self.$message(self.$t('save_success'));
          self.args.refreshTab([
            {
              name: 'documents',
              type: 'onForce',
              mode: 'update',
            },
            {
              name: 'documentDetails',
              type: 'onCascadeNavigation',
              mode: 'update',
              scope: 'partial',
            },
          ]);
          self.resetAfterSave();
        })
        .catch(err => {
          if (err.status != 200 && err.status != 401) {
            self.$message(self.$t('save_error'));
          }
        });
    },
    saveFieldDetails() {
      const data = this.transformToOutputField(this.field);
      return this.updateSingle(data.fieldId || 0, data, fieldApi);
    },
    saveToDB() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.$refs.fieldForm.validate(valid => {
          if (valid) {
            self
              .saveFieldDetails()
              .then(_ => {
                self.args.makeDirty(Object.assign({}, this.args), false);
                resolve();
              })
              .catch(err => {
                reject(err);
              });
          } else reject({ status: 401 });
        });
      });
    },
    onCommandField(command) {
      switch (command) {
        case 'save':
          if (this.args.isDirty(this.args)) {
            this.saveFieldToDB();
          } else this.$message(this.$t('no_pending_changes'));
          break;
        case 'refresh':
          this.args.makeDirty(Object.assign({}, this.args), false);
          this.resetAfterSave();
          break;
      }
    },
    fieldFormFieldChanged() {
      this.args.makeDirty(Object.assign({}, this.args), true);
    },
    loadFieldDetails() {
      const self = this;
      return new Promise((resolve, reject) => {
        self.loadingField = true;
        self.args.makeLoading(Object.assign({}, self.args), true);

        self.find(self.args.navigationProperty, `${fieldApi}`).then(resp => {
          self.args.makeLoading(Object.assign({}, self.args), false);
          if (resp && resp.msg === 'success') {
            self.loadingField = false;
            self.field = self.transformToInputField(resp.data);
            self.$refs.fieldForm.clearValidate();
            resolve();
          } else {
            self.$message(self.$t('error_loading_data'));
            self.loadingField = false;
            resolve();
          }
        });
      });
    },
    transformToInputField(x = {}) {
      return {
        fieldId: x.fieldId || 0,
        name: x.name || '',
        description: x.description || '',
        fieldDataTypeNo: x.fieldDataTypeNo || '',
        isActive: x.isActive || false,
        created: new Date(x.created).toLocaleDateString(),
        createdBy: x.createdBy,
        updated: new Date(x.updated).toLocaleDateString(),
        updatedBy: x.updatedBy,
        stamp: x.stamp,
      };
    },
    transformToOutputField(x = {}) {
      return {
        fieldId: x.fieldId || 0,
        name: x.name || '',
        description: x.description || '',
        fieldDataTypeNo: x.fieldDataTypeNo || '',
        isActive: x.isActive || false,
        created: new Date(x.created).toLocaleDateString(),
        createdBy: x.createdBy,
        updated: new Date(x.updated).toLocaleDateString(),
        updatedBy: x.updatedBy,
        stamp: x.stamp,
      };
    },
    refreshTranslations() {
      this.fieldFormRules.name[0].message = this.$t('name_blank');
      this.fieldFormRules.name[1].message = this.$t('length_validation');
      this.fieldFormRules.description[0].message = this.$t('description_blank');
      this.fieldFormRules.description[1].message = this.$t('length_validation');
      this.fieldFormRules.fieldDataTypeNo[0].message = this.$t('length_validation');
    },
  },
  mounted() {
    if (this.args.navigationProperty != null && this.args.navigationProperty != undefined) {
      this.loadFieldDetails();
    } else {
      this.$message(this.$t('invalid_navigation_record'));
    }
  },
  created() {
    const self = this;
    eventBus.$on('language', function() {
      try {
        self.refreshTranslations();
      } catch (e) {}
    });
  },
};
</script>
