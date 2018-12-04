<template>
  <div>
    <el-row>
        <el-col :span="24">
            <div class="grid-content">
                <data-tables-server ref="processLogsTable"
                                    :data="processLogs"
                                    :total="processLogsTotal"
                                    :loading="loadingProcessLogs"
                                    :table-props="processLogsTableProps"
                                    :show-action-bar="false"
                                    :custom-filters="processLogsFilter"
                                    @query-change="processLogsQueryChange">
                    <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                        <el-col :span="3">
                            <el-dropdown @command="onCommandProcessLogs">
                                <el-button type="primary"><t t="actions"></t><i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="refresh"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="refresh"></t></span></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                        <el-col :span="3" :offset="13">
                            <el-select v-model="processLogsFilterValue" placeholder="Select">
                                <el-option v-for="item in processLogsFilterOption" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <!--@input="debounceInput"-->
                            <el-input v-model="processLogsFilter[0].vals"
                                        prefix-icon="el-icon-search"
                                        :placeholder="$t('search_process_logs')">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-table-column :label="processLogsCols[0].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processLogsCols[0].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="processLogsCols[1].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processLogsCols[1].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="processLogsCols[2].label" min-width="auto">
                        <template scope="scope">
                            <el-button type="text" class="btn-showdetails" @click="openProcessQueueDetailsTab(scope.row,'process_log')">
                                {{scope.row[processLogsCols[2].prop]}}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :label="processLogsCols[3].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processLogsCols[3].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="processLogsCols[4].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processLogsCols[4].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column label="" min-width="auto">
                        <template scope="scope">
                            <el-button type="text" class="btn-showdetails" @click="openProcessLogDetailsTab(scope.row)">
                                <t t="show_details"></t>
                            </el-button>
                        </template>
                    </el-table-column>
                </data-tables-server>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import UtilityMixin from '../mixins/utilityMixin';
import { eventBus } from '../main';
import _ from 'lodash';
import ProcessLogViewModel from '../view_models/processLog_viewmodel';

const getallprocesslogs = 'getallProcessLogs';

/**
 * @description Process log component
 * follows standard list compnent template with new, edit and delete
 */
export default {
  name: 'processLog',
  mixins: [ProcessLogViewModel, UtilityMixin],
  props: {
    navigationProperty: {
      type: Number,
      required: true,
    },
  },
  methods: {
    /**@description opens process queue details tab */
    openProcessQueueDetailsTab(row) {
      let processQueueId = row.processQueueId || 0;
      this.redirectHandler('processQueueDetails', {
        type: 'onCascadeNavigation',
        additionalParam: {
          navigationProperty: processQueueId || 0,
        },
      });
    },
    /**@description opens process log details tab */
    openProcessLogDetailsTab(row) {
      let processLogId = row.processLogId || 0;
      this.redirectHandler('processLogDetails', {
        type: 'onCascadeNavigation',
        additionalParam: {
          navigationProperty: processLogId || 0,
        },
      });
    },
    /**@description refresh translations for filter options */
    refreshFilterOptions() {
      this.processLogsFilterOption[0].label = this.$t('processQueue');
      this.processLogsFilterOption[1].label = this.$t('processHandler');
      this.processLogsFilterOption[2].label = this.$t('message');
    },
    /**@description refresh translations for grid cols */
    refreshGridCols() {
      this.processLogsCols[0].label = this.$t('timestamp');
      this.processLogsCols[1].label = this.$t('state');
      this.processLogsCols[2].label = this.$t('processQueue');
      this.processLogsCols[3].label = this.$t('processHandler');
      this.processLogsCols[4].label = this.$t('message');
    },
    /**@description refresh translations */
    refreshTranslations() {
      this.refreshFilterOptions();
      this.refreshGridCols();
    },
    /* begin process logs grid transaction */
    /**@description on command handler for process log*/
    onCommandProcessLogs(command) {
      const self = this;
      if (command == 'refresh') {
        this.resetAfterSaveProcessLogs();
      }
    },
    /**@description reset procoss log as empty */
    resetProcessLogs() {
      if (this.$refs.processLogsTable) {
        this.$refs.processLogsTable.$children[1].setCurrentRow(null);
      }
      this.processLogs = [];
      this.processLogsFilterValue = '';
      this.processLogsFilter[0].vals = '';
    },
    /**@description protocol function resetAfterSave for process log */
    resetAfterSaveProcessLogs() {
      this.resetProcessLogs();
      if (this.navigationProperty || 0 != 0) {
        return this.loadProcessLogsFromDocument({
          pageSize: this.defaultPageSizeGrid,
          NavigationProperty: {
            Props: [
              {
                PropName: 'ProcessQueue.Document.DocumentId',
                PropValue: this.navigationProperty || 0,
                IsNestedProp: true,
              },
            ],
          },
          BaseFilterProps: {
            Props: [
              {
                PropName: 'Severity',
                PropValue: 'Error',
              },
            ],
          },
          OrderByProp: {
            PropName: 'ProcessLogId',
          },
          IsNavigationEnabled: true,
        });
      }
    },
    /**@description utility function */
    strDup(number = 0, character = '') {
      let str = '';
      for (let i = 1; i <= number; i++) {
        str += character;
      }
      return str;
    },
    /**@description format function for computed transformtion */
    formatMessage(message = '') {
      let msg = message;
      if (msg.trim().startsWith('<') && msg.trim().endsWith('>')) {
        let msgarr = message.split('><').filter(x => (x || '') != '');
        let indent = 0;
        msg = '';
        for (let row of msgarr) {
          let rowstr = row;
          if (!row.startsWith('<')) {
            rowstr = `<${rowstr}`;
          }
          if (!row.endsWith('>')) {
            rowstr = `${rowstr}>`;
          }
          if (rowstr.startsWith('</')) {
            indent -= 1;
          }
          msg += strDup(indent, '\t') + rowstr + '\n';
          if (rowstr.startsWith('<') && !rowstr.startsWith('</')) {
            indent += 1;
          }
          if (
            (!rowstr.startsWith('</') && rowstr.indexOf('</') != -1) ||
            rowstr.indexOf('/>') != -1
          ) {
            indent -= 1;
          }
        }
      }
      return msg;
    },
    /**@description transform function for input process log */
    transformToInputProcessLogs(data = []) {
      const retData = [];
      data = data;
      for (let item of data) {
        const temp = {};
        temp.processLogId = item.processLogId;
        temp.processHandlerId = item.processHandlerId;
        temp.processQueueId = item.processQueueId;
        temp.processSchemaStepId = item.processSchemaStepId;
        temp.traceEventTypeId = item.traceEventTypeId;
        temp.eventId = item.eventId;
        temp.severity = item.severity;
        temp.message = item.message;
        temp.timestamp = item.timestamp;
        temp.processQueue = item.processQueue != null ? item.processQueue.documentKey || '' : '';
        temp.processHandler = item.processHandler != null ? item.processHandler.name || '' : '';
        temp.stateId =
          item.severity == 'Verbose'
            ? 0
            : item.severity == 'Information'
              ? 0
              : item.severity == 'Warning'
                ? 3
                : item.severity == 'Error'
                  ? 4
                  : 0;
        temp.state = item.eventId == 0 ? item.severity : `${item.severity}("${item.eventId}")`;
        temp.formatedMessage = this.formatMessage(item.message);
        temp.documentIdentity =
          item.processQueue != null ? item.processQueue.documentIdentity || '' : '';
        retData.push(temp);
      }
      return retData;
    },
    /**@description load process log data with submitargs
     * @argument submitArgs:{
     * PaginationArgs:{
     * Type, Page, PageSize, BaseFilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, FilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, NavigationProperty:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, OrderByProp:{ PropName, Order:'asc'|'desc'
     * }, IsNavigationEnabled:true|false
     * } |
     * GetSingleArgs:{ FilterProps:{ Props:[{PropName, PropValue, IsNestedProp:true|false}],
     * IsMultipleValue:true|false }, IsNavigationEnabled:true|false
     * }
     * }
     */
    loadProcessLogsFromDocument(submitArgs = {}) {
      return new Promise((resolve, reject) => {
        const self = this;
        this.loadingProcessLogs = true;
        this.submit(getallprocesslogs, submitArgs)
          .then(resp => {
            self.processLogs = [...this.transformToInputProcessLogs(resp.data.result)];

            self.processLogsTotal = resp.data.total;
            self.loadingProcessLogs = false;
            resolve();
          })
          .catch(_ => {
            self.$message(self.$t('error_loading_data'));
            self.loadingProcessLogs = false;
            reject();
          });
      });
    },
    /**@description query change event handler for process log */
    processLogsQueryChange: _.debounce(function(args) {
      if (args) {
        if (this.processLogsFilterValue || '' != '') {
          if (args.filters[0].vals && args.filters[0].vals.length > 0) {
            let filterProps = [
              {
                PropName: this.processLogsFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
                IsNestedProp: this.processLogsFilterValue.indexOf('.') != -1 ? true : false,
              },
            ];
            this.loadProcessLogsFromDocument({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'ProcessQueue.Document.DocumentId',
                    PropValue: this.navigationProperty || 0,
                    IsNestedProp: true,
                  },
                ],
              },
              BaseFilterProps: {
                Props: [
                  {
                    PropName: 'Severity',
                    PropValue: 'Error',
                  },
                ],
              },
              OrderByProp: {
                PropName: 'ProcessLogId',
              },
              FilterProps: {
                Props: filterProps,
              },
              IsNavigationEnabled: true,
            });
          } else {
            this.processLogsFilter[0].vals = '';
            this.loadProcessLogsFromDocument({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'ProcessQueue.Document.DocumentId',
                    PropValue: this.navigationProperty || 0,
                    IsNestedProp: true,
                  },
                ],
              },
              BaseFilterProps: {
                Props: [
                  {
                    PropName: 'Severity',
                    PropValue: 'Error',
                  },
                ],
              },
              OrderByProp: {
                PropName: 'ProcessLogId',
              },
              IsNavigationEnabled: true,
            });
          }
        } else {
          //this.$message(this.$t('select_filter_col'));
          this.processLogsFilter[0].vals = '';
        }
      }
    }, 1000),
    /* end process logs grid transaction */
  },
  /**@description created lifecycle hook for component */
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
