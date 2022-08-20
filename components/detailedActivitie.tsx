import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import React, {useContext, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {StyleSheet, View, ScrollView, Keyboard} from 'react-native';
import {
  Divider,
  Surface,
  Subheading,
  Text,
  Button,
  Provider,
  Portal,
  Dialog,
  TextInput,
  useTheme,
} from 'react-native-paper';

import {GlobalContext} from '../context/GlobalState';
import overlay from '../overlay';
import {StackNavigatorParamlist} from '../types';

type Props = {
  id: number;
  fecha_actividad: string;
  user_id: number;
  client_id: number;
  sistemaclient: string;
  client_description: string;
  activitie_id: number;
  description: string;
  otherParam: string;
  navigation?: StackNavigationProp<StackNavigatorParamlist>;
};
interface IFormInputs {
  singleErrorInput: string;
  multipleErrorInput: string;
  numberInput: string;
}
const convertDate = date => {
  const d = dayjs(date).format('DD-MM-YYYY HH:MM');
  return d;
};
const convertDate1 = date => {
  const d = dayjs(date).format('YYYY/MM/DD hh:mm');
  return d;
};
export const DetailedActivitie = (propss: Props) => {
  //console.log('propss in detailed', propss);
  const navigation = propss; //Desestructur
  const theme = useTheme();
  const backgroundColor = overlay(1, theme.colors.surface) as string;
  const date = new Date();

  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);

  const showDialog = () => setVisible(true);
  const showDialog1 = () => setVisible1(true);

  const hideDialog = () => setVisible(false);
  const hideDialog1 = () => setVisible1(false);
  // const { control, register, handleSubmit, errors, setValue } = useForm();
  const {
    control,
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<IFormInputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {removeActivitie, updateActivitie, addActivitie, loading} =
    useContext(GlobalContext);

  const eliminar = id => {
    removeActivitie(id);
    hideDialog();
    setTimeout(() => {
      //navegando a home
      //navigation.navigation.push('ActivitiesList');
      navigation.navigation.navigate('ActivitiesList');
    }, 600);
  };
  const onSubmit = data => {
    const datas = {
      id: data.id,
      date: data.fecha_actividad,
      user_id: data.user_id,
      client_id: data.client_id,
      sistemaclient: data.sistemaclient,
      client_description: data.client_description,
      activitie_id: data.activitie_id,
      description: data.description,
      fecha_creado: convertDate1(date),
    };
    //console.log('datas', datas);
    setIsSubmitting(true);
    updateActivitie(datas);
    setVisible1(false); //close Dialog
    //debugger;
    setTimeout(() => {
      //navegando a home
      //navigation.navigation.push('ActivitiesList');
      navigation.navigation.navigate('ActivitiesList');
    }, 600);
  };

  return (
    <Provider>
      <Surface style={{backgroundColor}}>
        <ScrollView>
          <View style={styles.topRow}>
            <View>
              <Subheading style={styles.label}>
                Id:
                {propss.id} {'  '}
                <Button
                  dark
                  color="blue"
                  icon="file-document-edit-outline"
                  mode="contained"
                  onPress={() => {
                    Keyboard.dismiss();
                    showDialog1();
                  }}>
                  Edit
                </Button>
                {'  '}
                <Button
                  dark
                  color="red"
                  icon="delete-alert"
                  background-color="gray"
                  mode="contained"
                  onPress={() => {
                    Keyboard.dismiss();
                    showDialog();
                  }}>
                  Delete
                </Button>
              </Subheading>
            </View>
          </View>

          <View>
            <Divider style={{backgroundColor: 'gray'}} />
            <Subheading style={styles.label}>
              Fecha: {convertDate(propss.fecha_actividad)}
            </Subheading>
            <Subheading style={styles.label}>User: {propss.user_id}</Subheading>
            <Subheading style={styles.label}>
              Cliente: {propss.client_id}, {}
              {propss.client_description}
            </Subheading>
            <Subheading style={styles.label}>
              Sistema Atendido: {propss.sistemaclient}. {}
            </Subheading>
            <Divider style={{backgroundColor: 'gray'}} />
            <Subheading style={styles.label}>Actividad:</Subheading>
            <Subheading style={styles.label}>{propss.description}.</Subheading>
          </View>
        </ScrollView>
        <View>
          <Portal>
            <Dialog
              visible={visible}
              onDismiss={hideDialog}
              style={{backgroundColor}}>
              <Dialog.Title style={styles.title1}>
                !Alerta Vas a Eliminar la Actividad! {propss.id}{' '}
              </Dialog.Title>

              <Dialog.ScrollArea style={{maxHeight: 400, paddingHorizontal: 0}}>
                <ScrollView>
                  <View>
                    <Text style={styles.label}>
                      {' '}
                      ID:
                      {propss.id} {'  '}Fecha:{' '}
                      {convertDate(propss.fecha_actividad)}
                    </Text>
                  </View>

                  <View style={styles.topRow}>
                    <View>
                      <Subheading style={styles.label}>
                        <Button
                          dark
                          color="gray"
                          icon="file-cancel-outline"
                          mode="contained"
                          onPress={hideDialog}>
                          Cancelar
                        </Button>
                        {'  '}
                        <Button
                          dark
                          color="red"
                          icon="delete-alert"
                          background-color="gray"
                          mode="contained"
                          onPress={() => {
                            Keyboard.dismiss();
                            eliminar(propss.id);
                          }}>
                          Borrar
                        </Button>
                      </Subheading>
                    </View>
                  </View>
                </ScrollView>
              </Dialog.ScrollArea>
            </Dialog>
          </Portal>
        </View>
        <View>
          <Portal>
            <Dialog
              visible={visible1}
              onDismiss={hideDialog1}
              style={{backgroundColor}}>
              <Dialog.Title style={styles.title}>
                Edit Actividad: {propss.id}
              </Dialog.Title>
              <Dialog.ScrollArea style={{maxHeight: 450, paddingHorizontal: 0}}>
                <ScrollView>
                  <View>
                    <Text style={styles.label}>
                      Id:
                      <Controller
                        name="id"
                        control={control}
                        rules={{
                          required: {
                            value: false,
                            message: '* Please enter your id',
                          },
                          pattern: /\d+/,
                        }}
                        onFocus={() => {
                          true;
                        }}
                        render={props => (
                          <TextInput
                            {...props}
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={value => {
                              props.onChange(value);
                            }}
                            value={props.value}
                          />
                        )}
                        defaultValue={String(propss.id)}
                      />
                      {errors.id && <Text>This is required.</Text>}
                    </Text>
                    <Text style={styles.label}>
                      Fecha:
                      <Controller
                        name="fecha_actividad"
                        control={control}
                        rules={{required: 'this is required'}}
                        onFocus={() => {
                          true;
                        }}
                        render={props => (
                          <TextInput
                            {...props}
                            style={styles.input}
                            onChangeText={value => {
                              props.onChange(value);
                            }}
                          />
                        )}
                        defaultValue={convertDate1(propss.fecha_actividad)}
                      />
                      {errors.fecha_actividad && <Text>This is required.</Text>}
                    </Text>
                    <Text style={styles.label}>
                      User:
                      <Controller
                        name="user_id"
                        control={control}
                        rules={{required: true}}
                        render={props => (
                          <TextInput
                            {...props}
                            keyboardType="numeric"
                            style={styles.input}
                            onBlur={props.onBlur}
                            onChangeText={value => {
                              props.onChange(value);
                            }}
                          />
                        )}
                        defaultValue={String(propss.user_id)}
                      />
                      {errors.user_id && <Text>This is required.</Text>}
                    </Text>

                    <Text style={styles.label}>
                      Client ID:
                      <Controller
                        name="client_id"
                        control={control}
                        rules={{required: true}}
                        render={props => (
                          <TextInput
                            {...props}
                            keyboardType="numeric"
                            style={styles.input}
                            onBlur={props.onBlur}
                            onChangeText={value => {
                              props.onChange(value);
                            }}
                          />
                        )}
                        defaultValue={String(propss.client_id)}
                      />
                      {errors.client_id && <Text>This is required.</Text>}
                    </Text>

                    <Text style={styles.label}>
                      Cliente:
                      <Controller
                        name="client_description"
                        control={control}
                        rules={{required: true}}
                        render={props => (
                          <TextInput
                            {...props}
                            style={styles.input}
                            onBlur={props.onBlur}
                            onChangeText={value => {
                              props.onChange(value);
                            }}
                          />
                        )}
                        defaultValue={propss.client_description}
                      />
                      {errors.client_description && (
                        <Text>This is required.</Text>
                      )}
                    </Text>

                    <Text style={styles.label}>
                      Sistema Atendido:
                      <Controller
                        name="sistemaclient"
                        control={control}
                        rules={{required: true}}
                        render={props => (
                          <TextInput
                            {...props}
                            style={styles.input}
                            onBlur={props.onBlur}
                            onChangeText={value => {
                              props.onChange(value);
                            }}
                          />
                        )}
                        defaultValue={propss.sistemaclient}
                      />
                      {errors.sistemaclient && <Text>This is required.</Text>}
                    </Text>

                    <Text style={styles.label}>
                      Tipo Activitie_id:
                      <Controller
                        name="activitie_id"
                        control={control}
                        rules={{required: true}}
                        render={props => (
                          <TextInput
                            {...props}
                            keyboardType="numeric"
                            style={styles.input}
                            onBlur={props.onBlur}
                            onChangeText={value => {
                              props.onChange(value);
                            }}
                          />
                        )}
                        defaultValue={String(propss.activitie_id)}
                      />
                      {errors.activitie_id && <Text>This is required.</Text>}
                    </Text>
                    <Text style={styles.label}>Actividad:</Text>
                    <Controller
                      name="description"
                      control={control}
                      rules={{required: true}}
                      render={props => (
                        <TextInput
                          {...props}
                          multiline
                          numberOfLines={3}
                          style={styles.inputMulti}
                          onBlur={props.onBlur}
                          onChangeText={value => {
                            props.onChange(value);
                          }}
                        />
                      )}
                      defaultValue={propss.description}
                    />
                    {errors.description && <Text>This is required.</Text>}
                  </View>

                  <View style={styles.topRow}>
                    <View>
                      <Subheading style={styles.label}>
                        <Button
                          dark
                          color="gray"
                          icon="file-cancel-outline"
                          mode="contained"
                          onPress={hideDialog1}>
                          Cancelar
                        </Button>
                        {'  '}
                        <Button
                          dark
                          color="blue"
                          icon="content-save-edit-outline"
                          background-color="gray"
                          mode="contained"
                          onPress={handleSubmit(onSubmit)}>
                          Modificar
                        </Button>
                      </Subheading>
                    </View>
                  </View>
                </ScrollView>
              </Dialog.ScrollArea>
            </Dialog>
          </Portal>
        </View>
      </Surface>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  handle: {
    marginRight: 3,
    lineHeight: 12,
  },
  content: {
    marginTop: 25,
    fontSize: 20,
    lineHeight: 30,
  },
  image: {
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
    borderRadius: 20,
    width: '100%',
    height: 240,
  },
  input: {
    backgroundColor: '#f0f6fa',
    borderRadius: 4,
    fontSize: 16,
    height: 18,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  inputMulti: {
    backgroundColor: '#f0f6fa',
    borderRadius: 4,
    fontSize: 14,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  label: {
    paddingVertical: 5,
    marginLeft: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
    marginLeft: 19,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#4483b3',
  },
  title1: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
    marginLeft: 19,
    fontSize: 19,
    fontWeight: 'bold',
    color: 'red',
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    borderRadius: 4,
  },
});
