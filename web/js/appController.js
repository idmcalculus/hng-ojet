define(["knockout","ojs/ojmodule-element-utils","ojs/ojknockouttemplateutils","ojs/ojrouter","ojs/ojresponsiveutils","ojs/ojresponsiveknockoututils","ojs/ojarraydataprovider","ojs/ojoffcanvas","ojs/ojmodule-element","ojs/ojknockout"],function(e,o,r,a,t,s,l,i){return new function(){var n=this;this.KnockoutTemplateUtils=r;var u=t.getFrameworkQuery(t.FRAMEWORK_QUERY_KEY.SM_ONLY);n.smScreen=s.createMediaQueryObservable(u);var d=t.getFrameworkQuery(t.FRAMEWORK_QUERY_KEY.MD_UP);function c(e,o,r){this.name=e,this.linkId=o,this.linkTarget=r}n.mdScreen=s.createMediaQueryObservable(d),n.router=a.rootInstance,n.router.configure({dashboard:{label:"Dashboard"},admin_dashboard:{label:"Admin_dashboard"},register:{label:"Register"},submission:{label:"Submission"},login:{label:"Login",isDefault:!0},profile:{label:"User Profile"},password_reset:{label:"Reset password"}}),a.defaults.urlAdapter=new a.urlParamAdapter,n.moduleConfig=e.observable({view:[],viewModel:null}),n.loadModule=function(){e.computed(function(){var e=n.router.moduleConfig.name(),r="views/"+e+".html",a="viewModels/"+e;Promise.all([o.createView({viewPath:r}),o.createViewModel({viewModelPath:a})]).then(function(e){n.moduleConfig({view:e[0],viewModel:e[1]})})})},n.navDataProvider=new l([{name:"Login",id:"login"},{name:"Register",id:"register"},{name:"Dashboard",id:"dashboard"}],{keyAttributes:"id"}),n.mdScreen.subscribe(function(){i.close(n.drawerParams)}),n.drawerParams={displayMode:"push",selector:"#navDrawer",content:"#pageContent"},n.toggleDrawer=function(){return i.toggle(n.drawerParams)},n.appName=e.observable("OJET Team 20"),n.footerLinks=e.observableArray([new c("About Oracle","aboutOracle","http://www.oracle.com/us/corporate/index.html#menu-about"),new c("Contact Us","contactUs","http://www.oracle.com/us/corporate/contact/index.html"),new c("Legal Notices","legalNotices","http://www.oracle.com/us/legal/index.html"),new c("Terms Of Use","termsOfUse","http://www.oracle.com/us/legal/terms/index.html"),new c("Your Privacy Rights","yourPrivacyRights","http://www.oracle.com/us/legal/privacy/index.html")])}});