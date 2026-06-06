/* eslint-disable */
// @ts-nocheck
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Patient as PrismaPatient, Doctor as PrismaDoctor, Medication as PrismaMedication } from '@prisma/client';
import { GraphQLContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type CreateDoctorInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  licenseNumber: Scalars['Int']['input'];
  specialty: Scalars['String']['input'];
};

export type CreateMedicationInput = {
  brandName: Scalars['String']['input'];
  controlledSubstance: Scalars['Boolean']['input'];
  drugClass: Scalars['String']['input'];
  drugIdentificationNumber: Scalars['Int']['input'];
  genericName: Scalars['String']['input'];
  patientId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

export type CreatePatientInput = {
  age: Scalars['Int']['input'];
  allergies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  birthday: Scalars['DateTime']['input'];
  city: Scalars['String']['input'];
  familyDoctorId?: InputMaybe<Scalars['Int']['input']>;
  firstName: Scalars['String']['input'];
  gender: Gender;
  lastClinicVisit?: InputMaybe<Scalars['DateTime']['input']>;
  lastName: Scalars['String']['input'];
  nextClinicVisit?: InputMaybe<Scalars['DateTime']['input']>;
  phn: Scalars['Int']['input'];
  primaryCondition?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  primaryDoctorId: Scalars['Int']['input'];
  province: Scalars['String']['input'];
  secondaryCondition?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Doctor = {
  __typename?: 'Doctor';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  familyPatients: Array<Patient>;
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  licenseNumber: Scalars['Int']['output'];
  primaryPatients: Array<Patient>;
  specialty: Scalars['String']['output'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  NotSpecified = 'NOT_SPECIFIED',
  Other = 'OTHER'
}

export type Medication = {
  __typename?: 'Medication';
  brandName: Scalars['String']['output'];
  controlledSubstance: Scalars['Boolean']['output'];
  drugClass: Scalars['String']['output'];
  drugIdentificationNumber: Scalars['Int']['output'];
  genericName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  patient: Patient;
  patientId: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDoctor: Doctor;
  createMedication: Medication;
  createPatient: Patient;
  deleteDoctor: Scalars['Boolean']['output'];
  deleteMedication: Scalars['Boolean']['output'];
  deletePatient: Scalars['Boolean']['output'];
  updateDoctor: Doctor;
  updateMedication: Medication;
  updatePatient: Patient;
};


export type MutationCreateDoctorArgs = {
  input: CreateDoctorInput;
};


export type MutationCreateMedicationArgs = {
  input: CreateMedicationInput;
};


export type MutationCreatePatientArgs = {
  input: CreatePatientInput;
};


export type MutationDeleteDoctorArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMedicationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePatientArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateDoctorArgs = {
  id: Scalars['Int']['input'];
  input: UpdateDoctorInput;
};


export type MutationUpdateMedicationArgs = {
  id: Scalars['Int']['input'];
  input?: InputMaybe<UpdateMedicationInput>;
};


export type MutationUpdatePatientArgs = {
  id: Scalars['Int']['input'];
  input: UpdatePatientInput;
};

export type Patient = {
  __typename?: 'Patient';
  age: Scalars['Int']['output'];
  allergies?: Maybe<Array<Scalars['String']['output']>>;
  birthday: Scalars['DateTime']['output'];
  city: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  familyDoctor?: Maybe<Doctor>;
  familyDoctorId?: Maybe<Scalars['Int']['output']>;
  firstName: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['Int']['output'];
  lastClinicVisit?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  medications?: Maybe<Array<Maybe<Medication>>>;
  nextClinicVisit?: Maybe<Scalars['DateTime']['output']>;
  phn: Scalars['Int']['output'];
  primaryCondition?: Maybe<Array<Scalars['String']['output']>>;
  primaryDoctor: Doctor;
  primaryDoctorId: Scalars['Int']['output'];
  province: Scalars['String']['output'];
  secondaryCondition?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  doctor?: Maybe<Doctor>;
  doctors: Array<Doctor>;
  medication: Array<Medication>;
  patient?: Maybe<Array<Maybe<Patient>>>;
  patients: Array<Patient>;
};


export type QueryDoctorArgs = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  licenseNumber?: InputMaybe<Scalars['Int']['input']>;
  specialty?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMedicationArgs = {
  brandName?: InputMaybe<Scalars['String']['input']>;
  drugClass?: InputMaybe<Scalars['String']['input']>;
  drugIdentificationNumber?: InputMaybe<Scalars['Int']['input']>;
  genericName?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPatientArgs = {
  allergies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  familyDoctorId?: InputMaybe<Scalars['Int']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  medicationsName?: InputMaybe<Scalars['String']['input']>;
  phn?: InputMaybe<Scalars['Int']['input']>;
  primaryCondition?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  primaryDoctorId?: InputMaybe<Scalars['Int']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  secondaryCondition?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UpdateDoctorInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  licenseNumber?: InputMaybe<Scalars['Int']['input']>;
  specialty?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMedicationInput = {
  brandName?: InputMaybe<Scalars['String']['input']>;
  controlledSubstance?: InputMaybe<Scalars['Boolean']['input']>;
  drugClass?: InputMaybe<Scalars['String']['input']>;
  drugIdentificationNumber?: InputMaybe<Scalars['Int']['input']>;
  genericName?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePatientInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  allergies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  familyDoctorId?: InputMaybe<Scalars['Int']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  lastClinicVisit?: InputMaybe<Scalars['DateTime']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  medications?: InputMaybe<Array<InputMaybe<Medication>>>;
  nextClinicVisit?: InputMaybe<Scalars['DateTime']['input']>;
  phn?: InputMaybe<Scalars['Int']['input']>;
  primaryCondition?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  primaryDoctorId?: InputMaybe<Scalars['Int']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  secondaryCondition?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateDoctorInput: CreateDoctorInput;
  CreateMedicationInput: CreateMedicationInput;
  CreatePatientInput: CreatePatientInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Doctor: ResolverTypeWrapper<PrismaDoctor>;
  Gender: Gender;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Medication: ResolverTypeWrapper<PrismaMedication>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Patient: ResolverTypeWrapper<PrismaPatient>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateDoctorInput: UpdateDoctorInput;
  UpdateMedicationInput: UpdateMedicationInput;
  UpdatePatientInput: UpdatePatientInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateDoctorInput: CreateDoctorInput;
  CreateMedicationInput: CreateMedicationInput;
  CreatePatientInput: CreatePatientInput;
  DateTime: Scalars['DateTime']['output'];
  Doctor: PrismaDoctor;
  Int: Scalars['Int']['output'];
  Medication: PrismaMedication;
  Mutation: Record<PropertyKey, never>;
  Patient: PrismaPatient;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  UpdateDoctorInput: UpdateDoctorInput;
  UpdateMedicationInput: UpdateMedicationInput;
  UpdatePatientInput: UpdatePatientInput;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DoctorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Doctor'] = ResolversParentTypes['Doctor']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyPatients?: Resolver<Array<ResolversTypes['Patient']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  licenseNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  primaryPatients?: Resolver<Array<ResolversTypes['Patient']>, ParentType, ContextType>;
  specialty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type MedicationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Medication'] = ResolversParentTypes['Medication']> = ResolversObject<{
  brandName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  controlledSubstance?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  drugClass?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  drugIdentificationNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  genericName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  patient?: Resolver<ResolversTypes['Patient'], ParentType, ContextType>;
  patientId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createDoctor?: Resolver<ResolversTypes['Doctor'], ParentType, ContextType, RequireFields<MutationCreateDoctorArgs, 'input'>>;
  createMedication?: Resolver<ResolversTypes['Medication'], ParentType, ContextType, RequireFields<MutationCreateMedicationArgs, 'input'>>;
  createPatient?: Resolver<ResolversTypes['Patient'], ParentType, ContextType, RequireFields<MutationCreatePatientArgs, 'input'>>;
  deleteDoctor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteDoctorArgs, 'id'>>;
  deleteMedication?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteMedicationArgs, 'id'>>;
  deletePatient?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePatientArgs, 'id'>>;
  updateDoctor?: Resolver<ResolversTypes['Doctor'], ParentType, ContextType, RequireFields<MutationUpdateDoctorArgs, 'id' | 'input'>>;
  updateMedication?: Resolver<ResolversTypes['Medication'], ParentType, ContextType, RequireFields<MutationUpdateMedicationArgs, 'id'>>;
  updatePatient?: Resolver<ResolversTypes['Patient'], ParentType, ContextType, RequireFields<MutationUpdatePatientArgs, 'id' | 'input'>>;
}>;

export type PatientResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Patient'] = ResolversParentTypes['Patient']> = ResolversObject<{
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  allergies?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  birthday?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  familyDoctor?: Resolver<Maybe<ResolversTypes['Doctor']>, ParentType, ContextType>;
  familyDoctorId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastClinicVisit?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  medications?: Resolver<Maybe<Array<Maybe<ResolversTypes['Medication']>>>, ParentType, ContextType>;
  nextClinicVisit?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  phn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  primaryCondition?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  primaryDoctor?: Resolver<ResolversTypes['Doctor'], ParentType, ContextType>;
  primaryDoctorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  province?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  secondaryCondition?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  doctor?: Resolver<Maybe<ResolversTypes['Doctor']>, ParentType, ContextType, Partial<QueryDoctorArgs>>;
  doctors?: Resolver<Array<ResolversTypes['Doctor']>, ParentType, ContextType>;
  medication?: Resolver<Array<ResolversTypes['Medication']>, ParentType, ContextType, Partial<QueryMedicationArgs>>;
  patient?: Resolver<Maybe<Array<Maybe<ResolversTypes['Patient']>>>, ParentType, ContextType, Partial<QueryPatientArgs>>;
  patients?: Resolver<Array<ResolversTypes['Patient']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Doctor?: DoctorResolvers<ContextType>;
  Medication?: MedicationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Patient?: PatientResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

