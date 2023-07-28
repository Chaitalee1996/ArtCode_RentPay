//Splash
import Splash from "./initial/Splash";
import SplashModal from "./initial/SplashModal";

//Login
import Login from "./auth/Login";
// import Otp from "./auth/Otp";

//Home
import Home from "./home/Home";

//Property
import Properties from "./property/Properties";
import NewProperty from "./property/NewProperty";
import EditPropertyDetails from "./property/EditPropertyDetails";
import PropertyDetails from "./property/PropertyDetails";
import PropertyAssignDetails from "./property/PropertyAssignDetails";
import AssignProperty from "./tenant/AssignProperty";

//PROFILE
import ProfileEdit from "./profile/ProfileEdit";

//Tenants
import MyTenant from "./tenant/MyTenant";
import NewTenant from "./tenant/NewTenant";
import TenantInfo from "./tenant/TenantInfo";
import VacantProperty from "./tenant/VacantProperty";
import CollectRent from "./tenant/CollectRent";
import EditRent from "./tenant/EditRent";

//Collection
import Collection from "./collection/Collection";

//Expenses
import Expenses from "./expense/Expenses";
import NewExpense from "./expense/NewExpense";

//Analytics
import Analytics from "./analytics/Analytics";
import CollectionReport from "./analytics/CollectionReport";
import ExpenseReport from "./analytics/ExpenseReport";
import LedgerReport from "./analytics/LedgerReport";
import DepositeReport from "./analytics/DepositeReport";
import PoliceReport from "./analytics/PoliceReport";

//Subscription
import Subscription from "./subscription/Subscription";
import SubscriptionPlan from "./subscription/SubscriptionPlan";

//Notifications
import Notification from "./notification/Notification";

//Settings
import Setting from "./setting/Setting";
import UpdateProfile from "./setting/UpdateProfile";
import DisableProperties from "./setting/DisableProperties";
import Support from "./setting/Support";
import Terms from "./setting/Terms";
import Policy from "./setting/Policy";

export {
    Splash, SplashModal,
    Login,
    Home,
    ProfileEdit,
    Properties, NewProperty,
    MyTenant, NewTenant, TenantInfo, VacantProperty, CollectRent, EditRent,
    Collection,
    Expenses, NewExpense,
    Analytics, CollectionReport, ExpenseReport, LedgerReport, DepositeReport, PoliceReport,
    Subscription, SubscriptionPlan,
    Notification,
    Setting, UpdateProfile, DisableProperties, Support, Policy, Terms,
    EditPropertyDetails,PropertyDetails,PropertyAssignDetails,
    AssignProperty
};
