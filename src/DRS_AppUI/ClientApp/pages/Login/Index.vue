<template>
    <v-layout>
        <v-card contextual-style="dark" slot="layoutbody">
            <span slot="header">
                <t t="login"></t>
            </span>
            <div slot="body">
                <el-form ref="loginForm"
                         size="mini"
                         :rules="rules"
                         label-width="0px"
                         :label-position="'right'"
                         :model="user" status-icon>
                    <el-form-item prop="email">
                        <el-input v-model="user.email" type="email"
                                  :placeholder="$t('email')">
                            <i slot="prefix" class="el-input__icon fa fa-envelope fa-fw"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="user.password" type="password"
                                  :placeholder="$t('password')" auto-complete="off">
                            <i slot="prefix" class="el-input__icon fa fa-lock fa-fw"></i>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div id="menu-outer">
                    <div class="table">
                        <ul id="horizontal-list">
                            <li>
                                <el-button class="btn btn-outline-primary"
                                           v-loading="loading"
                                           type="primary" @click="login('loginForm')"><t t="login"></t></el-button>
                            </li>
                            <li><t t="no_account"></t></li>
                            <li><router-link :to="{ name: 'register.index' }"><t t="register"></t></router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </v-card>
    </v-layout>
</template>
<style scoped>
.row-bg {
  margin-top: 144px;
}

.table {
  margin: 0 auto;
}

ul#horizontal-list {
  margin-left: -39px;
  min-width: 696px;
  list-style: none;
}

ul#horizontal-list li {
  display: inline;
}
</style>
<script>
import VLayout from '../../layouts/Minimal';
import VCard from '../../components/Card';

export default {
  name: 'login-index',
  components: {
    VLayout,
    VCard
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error(this.$t('email_blank')));
      } else {
       var myRE = new RegExp (['^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,',
                        ';:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.',
                        ',;:\\s@\\"]+\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$'].join(''),'i');
        if (myRE.test(value)) {
                        callback();
                    } else {
                        callback(new Error(this.$t('invalid_email')));
                    }
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error(this.$t('password_blank')));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      user: {
        email: null,
        password: null
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    };
  },
  methods: {
    login(formName) {
      const self = this;
      this.loading = true;
      setTimeout(() => {
        self.$refs[formName].validate(valid => {
          if (valid) {
            self.loading = false;
            self.$store.dispatch('auth/login', this.user);
          } else {
            self.loading = false;
            self.$message(self.$t('invalid form'));
            return false;
          }
        });
      }, 400);
    }
  },
  created() {
    const self = this;
    setTimeout(() => {
      self.user.email = 'abc.xyz@gmail.com';
      self.user.password = '123';
      self.login('loginForm');
    }, 400);
  }
};
</script>
