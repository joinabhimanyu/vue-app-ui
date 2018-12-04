<template>
    <v-layout>
        <v-card contextual-style="dark" slot="layoutbody">
            <span slot="header">
                <t t="register"></t>
            </span>
            <div slot="body">
                <el-form ref="registerform"
                         size="mini"
                         :rules="rules"
                         label-width="0px"
                         :label-position="'right'"
                         :model="user" status-icon>
                    <el-form-item prop="firstName">
                        <el-input v-model="user.firstName" type="text"
                                  :placeholder="$t('first_name')">
                            <i slot="prefix" class="el-input__icon fa fa-user fa-fw"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="lastName">
                        <el-input v-model="user.lastName" type="text"
                                  :placeholder="$t('last_name')">
                            <i slot="prefix" class="el-input__icon fa fa-user fa-fw"></i>
                        </el-input>
                    </el-form-item>
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
                    <el-form-item prop="passwordConfirm">
                        <el-input v-model="user.passwordConfirm" type="password"
                                  :placeholder="$t('confirm_password')" auto-complete="off">
                            <i slot="prefix" class="el-input__icon fa fa-lock fa-fw"></i>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div id="menu-outer">
                    <div class="table">
                        <ul id="horizontal-list">
                            <li>
                                <el-button class="btn btn-outline-primary"
                                           type="primary" @click="register('registerform')"><t t="register"></t></el-button>
                            </li>
                            <li><t t="already_got_account"></t></li>
                            <li><router-link :to="{ name: 'login.index' }"><t t="login"></t></router-link></li>
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
  name: 'register-index',
  components: {
    VLayout,
    VCard
  },
  data() {
    const validateFirstName = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error(this.$t('first_name_blank')));
      } else {
        callback();
      }
    };
    const validateLastName = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error(this.$t('last_name_blank')));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error(this.$t('email_blank')));
      } else {
        // validate email with pattern
        const pattern = new RegExp(
          [
            '/^(([^<>()[].,;:s@"]+(.[^<>()[].,',
            ';:s@"]+)*)|(".+"))@(([^<>()[].,',
            ';:s@"]+.)+[^<>()[].,;:s@"]{2,})$/'
          ].join(''),
          'i'
        );
        if (pattern.test(value)) {
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
        if (this.user.passwordConfirm !== '') {
          this.$refs.registerform.validateField('passwordConfirm');
        }
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error(this.$t('confirm_password_blank')));
      } else if (value !== this.user.password) {
        callback(new Error(this.$t('confirm_password_mismatch')));
      } else {
        callback();
      }
    };
    return {
      user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordConfirm: null
      },
      rules: {
        firstName: [{ validator: validateFirstName, trigger: 'blur' }],
        lastName: [{ validator: validateLastName, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        passwordConfirm: [{ validator: validateConfirmPassword, trigger: 'blur' }]
      }
    };
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('auth/register', this.user);
        } else {
          this.$message(this.$t('invalid_email'));
          return false;
        }
      });
    }
  }
};
</script>
